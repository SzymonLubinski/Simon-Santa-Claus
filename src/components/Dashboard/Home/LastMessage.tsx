

import styles from './LastMessage.module.scss';
import Link from "next/link";
import {chatHrefConstructor} from "@/lib/utils";
import dayjs from "dayjs";


interface LastMessageProps{
    sessionUserId: string;
    friendId: string;
    friendName: string;
    lastMessageSenderId: string;
    lastMessageText: string;
    lastMessageDate: string
}


const LastMessage = (
    {
        sessionUserId,
        lastMessageSenderId,
        lastMessageText,
        friendId,
        friendName,
        lastMessageDate
    }: LastMessageProps
) => {

    return (
        <li className={styles.container}>
            <Link href={`/dashboard/chat/${chatHrefConstructor(
                sessionUserId,
                friendId
            )}`}>
                <div className={styles.chat}>
                    <section className={styles.chat__image}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path
                                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                        </svg>
                    </section>
                    <section>
                        <h1>{friendName}</h1>
                        <div className={styles.chat__text}>
                            <div className={styles.chat__box}>
                                {lastMessageSenderId === sessionUserId && (<h3>Ty:</h3>)}
                                <p>{lastMessageText}</p>
                            </div>
                            <span>{dayjs(lastMessageDate).format('HH:mm')}</span>
                        </div>
                    </section>
                </div>
            </Link>
        </li>
    )
}

export default LastMessage;