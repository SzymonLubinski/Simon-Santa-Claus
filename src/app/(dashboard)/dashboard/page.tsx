

import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {getFriendsByUserId} from "@/helpers/get-friends";
import {fetchRedis} from "@/helpers/redis";
import {chatHrefConstructor} from "@/lib/utils";
import Link from "next/link";
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
            if (lastMessageRaw === undefined){
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
            {friendsWithLastMessage.length > 0 ? (
                <ul className={styles.chatList}>
                    {friendsWithLastMessage.map((friend) => {
                        if (friend === undefined){
                            return
                        }
                        return (
                            <li key={friend.id} className={styles.chat}>
                                <Link href={`/dashboard/chat/${chatHrefConstructor(
                                    session.user.id,
                                    friend.id
                                )}`}>
                                    <h1>{friend.name}</h1>
                                    <div className={styles.chat__horizontal}>
                                        <p>{friend.lastMessage.senderId === session.user.id ? 'Ty:' : ''}</p>
                                        <p>{friend.lastMessage.text}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className={styles.welcome}>
                    <div className={styles.welcome__container}>
                        <h1 className={styles.welcome__title}>
                            Witaj {session.user.name}
                        </h1>
                        <p>
                            Na tej stronie zorganizujesz swoje losowanie mikołajkowe
                            i skontaktujesz się z przyjaciółmi
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page;