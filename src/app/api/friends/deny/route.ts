import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {z} from "zod";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";


export async function POST (req: Request) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session){
            return new Response('unauthorized', {status: 401})
        }
        const {id: idToDeny} = z.object({id: z.string()}).parse(body);
        await pusherServer.trigger(
            toPusherKey(`user:${idToDeny}:incoming_friend_requests`),
            'incoming_friend_requests', {
                senderId: session.user.id,
                senderEmail: session.user.email,
            }
        )
        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny)
        return new Response('OK')
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response('Invalid payload Accept', {status: 422});
        }
        return new Response('Invalid request Accept', {status: 400});
    }
}