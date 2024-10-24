'use client'

import {useEffect, useState} from 'react';
import Link from "next/link";
import styles from './FriendsRequestsSidebarOptions.module.scss';
import {pusherClient} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setOn} from "@/redux/portalSlice";


interface FriendsRequestsSidebarOptionsProps{
    initialUnseenRequestCount: number;
    sessionId: string;
}


const FriendsRequestsSidebarOptions = (
    {
        initialUnseenRequestCount,
        sessionId
    } : FriendsRequestsSidebarOptionsProps
) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
       initialUnseenRequestCount
    );

    useEffect(() => {
        pusherClient.subscribe(
            toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        )
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

        const friendRequestHandler = () => {
            setUnseenRequestCount((prev) => prev + 1)
        }

        const addedFriendHandler = () => {
            setUnseenRequestCount((prev) => prev - 1)
        }

        pusherClient.bind('incoming_friend_requests', friendRequestHandler)
        pusherClient.bind('new_friend', addedFriendHandler)

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            )
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))

            pusherClient.unbind('new_friend', addedFriendHandler)
            pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
        }
    }, [sessionId])

    return (
        <Link href={'/dashboard/requests'} onClick={() => dispatch(setOn())}>
            <div className={styles.requests}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                <p>Friends requests</p>
                {unseenRequestCount > 0 ? (
                    <div className={styles.requests__amount}>{unseenRequestCount}</div>
                ) : null}
            </div>
        </Link>
    )
}

export default FriendsRequestsSidebarOptions;


