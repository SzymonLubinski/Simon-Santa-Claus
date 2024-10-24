'use client'

import {FC, useEffect, useState} from 'react';
import SelectImg from "@/components/UI/SelectImg";
import styles from './FriendRequests.module.scss';
import axios from "axios";
import {useRouter} from "next/navigation";
import {pusherClient} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";


interface FriendRequestProps {
    IncomingFriendRequests: IncomingFriendRequest[];
    sessionId: string;
}

const FriendRequests: FC<FriendRequestProps> = (
    {IncomingFriendRequests, sessionId}
) => {
    const dispatch = useDispatch();
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
        IncomingFriendRequests
    );
    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));
        const friendRequestHandler = ({senderId, senderEmail}: IncomingFriendRequest) => {
            setFriendRequests((prevState) => [...prevState, {senderId, senderEmail}]);
        }
        pusherClient.bind('incoming_friend_requests', friendRequestHandler)
        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));
            pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
        }
    }, [sessionId]);


    const router = useRouter();
    const acceptFriend = async (senderId: string) => {
        await axios.post('/api/friends/accept', {
            id: senderId
        });
        setFriendRequests((prevState) => prevState.filter(
            (request) => request.senderId !== senderId)
        );
        router.refresh();
    }


    const denyFriend = async (senderId: string) => {
        await axios.post('/api/friends/deny', {
            id: senderId
        });
        setFriendRequests((prevState) => prevState.filter(
            (request) => request.senderId !== senderId)
        );
        router.refresh();
    }

    dispatch(setOff());
    return (
        <>
            {friendRequests.length === 0 ? (
                <div className={styles.noRequests}>
                    <h1>Nie masz nowych zaproszeń</h1>
                </div>
            ) : (
                <div className={styles.container}>
                    <h1 className={styles.container__title}>Nowe zaproszenia</h1>
                    {friendRequests.map((request) => (
                        <div key={request.senderId} className={styles.request}>
                            <SelectImg selectedImg={'user'} height={50}/>
                            <p className={styles.request__text}>{request.senderEmail}</p>
                            <button onClick={() => acceptFriend(request.senderId)}
                                    className={styles.request__btn}>dodaj
                            </button>
                            <button onClick={() => denyFriend(request.senderId)}
                                    className={styles.request__btn}>usuń
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default FriendRequests;