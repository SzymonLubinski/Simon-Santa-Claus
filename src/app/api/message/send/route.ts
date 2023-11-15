import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {fetchRedis} from "@/helpers/redis";
import {db} from "@/lib/db";
import {nanoid} from "nanoid";
import {messageValidator} from "@/lib/validation/message";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response('Unauthorized', {status: 401});
    }
    try {
        const {text, chatId, chatType}: {
            text: string,
            chatId: string,
            chatType: string
        } = await req.json();
        let friendId;
        if (chatType === 'pair'){
            const [userId1, userId2] = chatId.split('--');
            if (session.user.id !== userId1 && session.user.id !== userId2){
                return new Response('Unauthorized', {status: 401});
            }
            friendId = session.user.id === userId1 ? userId2 : userId1;
            const friendList = await fetchRedis(
                'smembers',
                `user:${session.user.id}:friends`
            ) as string[];
            const isFriend = friendList.includes(friendId);
            if (!isFriend){
                return new Response('Unauthorized', {status: 401});
            }
        }
        if (chatType === 'group'){
            const groupList = await fetchRedis(
                'smembers',
                `user:${session.user.id}:groups`
            )
            const isGroup = groupList.includes(chatId)
            if (!isGroup){
                return new Response('Unauthorized', {status: 401});
            }
        }

        const rawSender = await fetchRedis(
            'get',
            `user:${session.user.id}`
        ) as string;
        const sender = JSON.parse(rawSender) as User;
        const timestamp = Date.now();
        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text: text,
            timestamp: timestamp,
            messageType: "text",
        }
        const message = messageValidator.parse(messageData);
        await pusherServer.trigger(
            toPusherKey(`chat:${chatId}`),
            'incoming-message',
            message
        );

        if (friendId){
            await pusherServer.trigger(
                toPusherKey(`user:${friendId}:chats`),
                'new-message',
                {
                    ...message,
                    senderImg: sender.image,
                    senderName: sender.name,
                }
            );
        }
        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message),
        });
        console.log('poszło')
        return new Response('OK');
    } catch (err) {
        if (err instanceof Error){
            return new Response(err.message, {status: 500});
        }
        return new Response('internal server error', {status: 500});
    }
}