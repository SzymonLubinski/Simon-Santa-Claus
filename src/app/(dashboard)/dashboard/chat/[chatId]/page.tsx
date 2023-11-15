import {FC} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {db} from "@/lib/db";
import {fetchRedis} from "@/helpers/redis";
import {messageArrayValidator} from "@/lib/validation/message";
import Profile from "@/components/Chat/Profile";
import Correspondence from "@/components/Chat/Correspondence";
import ChatInput from "@/components/Chat/ChatInput";
import styles from './chat.module.scss';

interface PageProps {
    params: {
        chatId: string
    }
}

async function getChatMessages(chatId: string) {
    try {
        const results: string[] = await fetchRedis(
            'zrange',
            `chat:${chatId}:messages`,
            0,
            -1
        )
        const dbMessages = results.map((message) => JSON.parse(message) as Message)
        const reversedDbMessages = dbMessages.reverse();
        return messageArrayValidator.parse(reversedDbMessages);
    } catch (err) {
        notFound();
    }
}


const Page: FC<PageProps> = async ({params}) => {
    const {chatId} = params;
    const session = await getServerSession(authOptions);
    if (!session) notFound();
    let chatPartner;
    let chatType;
    if (chatId.includes('--')){
        const [userId1, userId2] = chatId.split('--');
        if (session.user.id !== userId1 && session.user.id !== userId2) notFound();
        const chatPartnerId = session.user.id === userId1 ? userId2 : userId1;
        chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
        chatType = 'pair';
    } else {
        const rawChatPartner = await fetchRedis(
            'get',
            `group:${chatId}`,
        )
        chatPartner = JSON.parse(rawChatPartner);
        chatType = 'group';
    }
    const initialMessages = await getChatMessages(chatId);

    return (
        <div className={styles.chatPage}>
            <Profile chatPartner={chatPartner}/>
            <Correspondence initialMessages={initialMessages} sessionId={session.user.id} chatId={chatId}/>
            <ChatInput chatPartner={chatPartner} chatId={chatId} chatType={chatType}/>
        </div>
    )
}

export default Page;