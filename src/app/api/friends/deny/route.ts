import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {z} from "zod";
import {db} from "@/lib/db";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";
import {fetchRedis} from "@/helpers/redis";


export async function POST (req: Request) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session){
            return new Response('unauthorized', {status: 401})
        }
        const {id: idToDeny} = z.object({id: z.string()}).parse(body);



        // To usuwanie chyba nie jest do końca dobre ponieważ 'new_friend' powinno odnosić
        //  się do dodania znajomego, ale powiadomienie o nowym zaproszeniu znika
        // poprawnie
        const friendRaw = await fetchRedis(
            'get',
            `user:${idToDeny}`,
        ) as string;

        const friend = JSON.parse(friendRaw) as User;

        await Promise.all([
            pusherServer.trigger(
                toPusherKey(`user:${session.user.id}:friends`),
                'new_friend',
                friend
            ),

            await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny)
        ])

        return new Response('OK')
    } catch (err) {
        if (err instanceof z.ZodError) {
            return new Response('Invalid payload Accept', {status: 422});
        }
        return new Response('Invalid request Accept', {status: 400});
    }
}