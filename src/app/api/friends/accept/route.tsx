import {z} from 'zod';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";

export async function POST (req: Request) {
    try {
        const body = await req.json();
        const {id: idToAdd} = z.object({id: z.string()}).parse(body);
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('unauthorized', {status: 401});
        }
        const isAlreadyFriends = await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        );
        if (isAlreadyFriends) {
            return new Response('is Already friends!', {status: 400});
        }
        const hasFriendRequest = await fetchRedis(
            'sismember',
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );
        if (!hasFriendRequest) {
            return new Response('no friend request!', {status: 400});
        }
        await pusherServer.trigger(
            toPusherKey(`user:${idToAdd}:friends`),
            'new-friend',
            '',
        )
        await db.sadd(`user:${session.user.id}:friends`, idToAdd);
        await db.sadd(`user:${idToAdd}:friends`, session.user.id);
        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)
        return new Response('OK');
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response('Invalid payload Accept', {status: 422});
        }
        return new Response('Invalid request Accept', {status: 400});
    } finally {

    }
}