'use client'

import {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {chatHrefConstructor, toPusherKey} from "@/lib/utils";
import {pusherClient} from "@/lib/pusher";
import Link from "next/link";
import styles from './ListStyles.module.scss';
import {useDispatch} from "react-redux";
import {setOn} from "@/redux/portalSlice";

interface SideBarChatListProps{
    friends: User[];
    userId: string;
    hideLayout: () => void;
}

interface ExtendedMessage extends Message{
    senderImg: string;
    senderName: string;
}

const SideBarChatList = ({friends, userId, hideLayout}: SideBarChatListProps) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(setOn());
        hideLayout();
    }
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${userId}:chats`));
        pusherClient.subscribe(toPusherKey(`user:${userId}:friends`));
        const chatHandler = (message: ExtendedMessage) => {
            const shouldNotify = pathname !== `/dashboard/chat/${
                chatHrefConstructor(userId, message.senderId)
            }`;
            if (!shouldNotify) return;
            setUnseenMessages((prev) => [...prev, message])
        }
        const newFriendHandler = () => {
            router.refresh();
        }
        pusherClient.bind('new-message', chatHandler);
        pusherClient.bind('new-friend', newFriendHandler);
        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${userId}:chats`));
            pusherClient.unsubscribe(toPusherKey(`user:${userId}:friends`));
            pusherClient.unbind('new-message', chatHandler);
            pusherClient.unbind('new-friend', newFriendHandler);
        }
    }, [router, pathname, userId])


    useEffect(() => {
        if (pathname?.includes('chat')){
            setUnseenMessages((prevState) => {
                return prevState.filter((msg) => !pathname.includes(msg.senderId))
            })
        }
    }, [pathname])

    return (
        <ul role={'list'} className={styles.itemList}>
            {friends.sort().map((friend) => {
                const unseenMassagesCount = unseenMessages.filter((unseenMsg) => {
                    return unseenMsg.senderId === friend.id;
                })

                return (
                    <li key={friend.id} className={styles.itemList__item}>
                        <Link href={`/dashboard/chat/${chatHrefConstructor(userId, friend.id)}`}
                              onClick={clickHandler}
                        >
                            <div className={styles.itemList__link}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                                <p>{friend.name}</p>
                                    {unseenMassagesCount.length > 0 ? (
                                <div className={styles.itemList__unseen}>
                                    {unseenMassagesCount.length}
                                </div>
                                    ) : null}
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default SideBarChatList;
