'use client'

import {signOut} from "next-auth/react";
import {ButtonHTMLAttributes, FC, useState} from 'react';
import SelectImg from "@/components/UI/SelectImg";
import styles from './SignOutButton.module.scss';


interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const SignOutButton: FC<SignOutButtonProps> = ({...props}) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
    const signOutHandler = async () => {
        setIsSigningOut(true)
        try {
            await signOut();
        } catch (err) {
            console.log('error')
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <button className={styles.btn} onClick={signOutHandler}>
            {isSigningOut ? (
                <div className={styles.btn__loggingOut}>
                    <p>wylogowuje...</p>
                </div>
            ) : (
                <div className={styles.btn__loggedIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                </div>
            )}
        </button>
    )
}

export default SignOutButton;