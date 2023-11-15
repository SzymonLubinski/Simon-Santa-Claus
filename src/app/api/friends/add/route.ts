import {getServerSession} from "next-auth";
import {z} from 'zod';
import {addFriendValidator} from "@/lib/validation/add-friend";
import {authOptions} from "@/lib/auth";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email: emailToAdd} = addFriendValidator.parse(body.email);
        const idToAdd = await fetchRedis(
            'get',
            `user:email:${emailToAdd}`,
        ) as string;

        if (!idToAdd) {
            return new Response('This person does not exist', {status: 400});
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', {status: 401});
        }

        if (idToAdd === session.user.id) {
            return new Response('you cannot add yourself', {status: 400})
        }

        const isAlreadyAdded = (await fetchRedis(
            'sismember',
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id,
        )) as 0 | 1;

        if (isAlreadyAdded) {
            return new Response('already added', {status: 400})
        }


        const isAlreadyFriends = (await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd,
        )) as 0 | 1;

        if (isAlreadyFriends) {
            return new Response('already friends', {status: 400})
        }
        await pusherServer.trigger(
            toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
            'incoming_friend_requests', {
                senderId: session.user.id,
                senderEmail: session.user.email,
            }
        )
        await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
        return new Response('ok');
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response('Invalid payload', {status: 422});
        }
        return new Response('Invalid request', {status: 400});
    }
}