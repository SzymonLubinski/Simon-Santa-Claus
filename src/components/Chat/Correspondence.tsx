'use client'

import {FC, useEffect, useState} from "react";
import Image from "next/image";
import dayjs from "dayjs";
import {pusherClient} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";
import ScrollContainer from "@/components/Chat/ScrollContainer";
import styles from './Correspondence.module.scss';


interface CorrespondenceProps {
    initialMessages: Message[];
    sessionId: string;
    chatId: string;
}

const Correspondence: FC<CorrespondenceProps> = ({initialMessages, sessionId, chatId}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`chat:${chatId}`));
        const messageHandler = (message: Message) => {
            setMessages((prevState) => [message, ...prevState])
        }
        pusherClient.bind('incoming-message', messageHandler)
        return () => {
            pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
            pusherClient.unbind('incoming-message', messageHandler)
        }
    }, [chatId]);

    return (
        <div className={styles.container}>
            <ScrollContainer>
                <div className={styles.container__messages}>
                    {messages.map((message) => {
                        const messageTime = dayjs(message.timestamp);
                        if (message.senderId === sessionId) {
                            if (message.messageType === 'image') {
                                return (
                                    <div key={message.id} className={styles.message}>
                                        <div className={styles.message__user}>
                                            <div className={styles.message__container}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                                    </svg>
                                                </div>
                                                <p className={styles.message__time}>{messageTime.format('HH:mm')}</p>
                                            </div>
                                            <div className={styles.message__file}>
                                                <Image src={message.text}
                                                       alt={'chat'}
                                                       fill
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (message.messageType === 'video') {
                                return (
                                    <div key={message.id} className={styles.message}>
                                        <div className={styles.message__user}>
                                            <div className={styles.message__container}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                                    </svg>
                                                </div>
                                                <p className={styles.message__time}>{messageTime.format('HH:mm')}</p>
                                            </div>
                                            <div className={styles.message__file}>
                                                <video src={message.text}
                                                       controls
                                                       autoPlay={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <div key={message.id} className={styles.message}>
                                    <div className={styles.message__user}>
                                        <div className={styles.message__container}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                                </svg>
                                            </div>
                                            <span className={styles.message__time}>{messageTime.format('HH:mm')}</span>
                                        </div>
                                        <p className={styles.message__text}>{message.text}</p>
                                    </div>
                                </div>
                            )
                        }
                        if (message.messageType === 'image') {
                            return (
                                <div key={message.id} className={styles.message}>
                                    <div className={styles.message__friend}>
                                        <div className={styles.message__file}>
                                            <Image src={message.text}
                                                   alt={'chat'}
                                                   fill
                                            />
                                        </div>
                                        <div className={styles.message__container}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                                </svg>
                                            </div>
                                            <p className={styles.message__time}>{messageTime.format('HH:mm')}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        if (message.messageType === 'video') {
                            return (
                                <div key={message.id} className={styles.message}>
                                    <div className={styles.message__friend}>
                                        <video src={message.text} height={300} width={400}/>
                                        <div className={styles.message__container}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                                </svg>
                                            </div>
                                            <p className={styles.message__time}>{messageTime.format('HH:mm')}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div key={message.id} className={styles.message}>
                                <div className={styles.message__friend}>
                                    <span className={styles.message__text}>{message.text}</span>
                                    <div className={styles.message__container}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                                            </svg>
                                        </div>
                                        <p className={styles.message__time}>{messageTime.format('HH:mm')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollContainer>
        </div>
    )
}

export default Correspondence;