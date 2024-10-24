'use client'

import Link from "next/link";
import {useDispatch} from "react-redux";
import {setOn} from "@/redux/portalSlice";
import styles from './SessionInfo.module.scss';


interface SessionInfoProps {
    userName: string | null | undefined;
}


const SessionInfo = ({userName}: SessionInfoProps) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.profile}>
            {userName ? (
                <div className={styles.profile__link}>
                    <Link href={'/dashboard'} onClick={() => dispatch(setOn())}>
                        <p className={styles.profile__text}>Dashboard</p>
                    </Link>
                </div>
            ) : (
                <div className={styles.profile__loggedOut}>
                    <div className={styles.profile__link}>
                        <Link href={'/login'} onClick={() => dispatch(setOn())}>
                            Zaloguj się
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SessionInfo;