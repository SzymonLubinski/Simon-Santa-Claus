'use client'

import {FC, useState} from "react";
import Link from "next/link";
import styles from './SessionInfo.module.scss';
import LoadingBG from "@/components/Portal/LoadingBG";


interface SessionInfoProps {
    userName: string | null | undefined;
}


const SessionInfo: FC<SessionInfoProps> = ({userName}) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className={styles.profile}>
            {loading && <LoadingBG/>}
            {userName ? (
                <div className={styles.profile__logged}>
                    <div className={styles.profile__circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                    </div>
                    <div className={styles.profile__link}>
                        <Link href={'/dashboard'}>
                            <p className={styles.profile__text}>Dashboard</p>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={styles.profile__loggedOut}>
                    <div className={styles.profile__circle}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                    </div>
                    <div className={styles.profile__link} onClick={() => setLoading(true)}>
                        <Link href={'/login'}>
                            Zaloguj się
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SessionInfo;