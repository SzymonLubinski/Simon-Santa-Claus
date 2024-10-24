import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {getFriendsByUserId} from "@/helpers/get-friends";
import {fetchRedis} from "@/helpers/redis";
import {chatHrefConstructor} from "@/lib/utils";
import DashboardHome from "@/components/Dashboard/Home/DashboardHome";
import LastMessage from "@/components/Dashboard/Home/LastMessage";
import styles from './dashboard.module.scss';


const Page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const friends = await getFriendsByUserId(session.user.id);
    const friendsWithLastMessage = await Promise.all(
        friends.map(async (friend) => {
            const [lastMessageRaw] = await fetchRedis(
                'zrange',
                `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
                -1,
                -1,
            ) as string[];
            if (lastMessageRaw === undefined) {
                return
            }
            const lastMessage = JSON.parse(lastMessageRaw) as Message;
            return {
                ...friend,
                lastMessage,
            }
        })
    )

    return (
        <div className={styles.pageContainer}>
            {/*<DashboardHome/>*/}
            <div className={styles.welcome}>
                <h4>Witaj</h4>
                <h1>{session.user.name}</h1>
            </div>
            {friendsWithLastMessage.length > 0 && (
                <div className={styles.activeMessages}>
                    <p>Twoje ostatnie kontakty:</p>
                    <ul className={styles.chatList}>
                        {friendsWithLastMessage.map((friend) => {
                            if (friend === undefined) {
                                return
                            }
                            return (
                                <LastMessage key={friend.id}
                                             sessionUserId={session.user.id}
                                             lastMessageSenderId={friend.lastMessage.senderId}
                                             lastMessageText={friend.lastMessage.text}
                                             friendId={friend.id}
                                             friendName={friend.name}
                                             lastMessageDate={friend.lastMessage.timestamp}
                                />
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Page;