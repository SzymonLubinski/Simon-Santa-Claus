'use client'

import {FC, useState} from "react";
import {signIn} from "next-auth/react";
import SelectImg from "@/components/UI/SelectImg";
import FormRegister from "@/components/Main/FormRegister";
import FormLogin from "@/components/Main/FormLogin";
import styles from './LoginPage.module.scss';


const LoginPage: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [formType, setFormType] = useState('login');

    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn('google');
        } catch (err) {
            console.log('something wrong')
        } finally {
            setIsLoading(false);
        }
    }
    const registrationCompleted = () => {
        setFormType('login');
    }

        return (
        <div className={styles.container}>
            {formType === 'registration' && (
                <div className={styles.formContainer}>
                    <FormRegister toLogin={registrationCompleted}/>
                    <div className={styles.formContainer__link} onClick={() => setFormType('login')}>
                        <p>Jesteś już zalogowany?</p>
                        <p>Przejdź do logowania</p>
                    </div>
                </div>
            )}
            {formType === 'login' && (
                <div className={styles.formContainer}>
                    <FormLogin/>
                    <div className={styles.formContainer__link} onClick={() => setFormType('registration')}>
                        <p>Jesteś już zarejestrowany?</p>
                        <p>Przejdź do rejstracji</p>
                    </div>
                </div>
            )}
            <div className={styles.google}>
                <p className={styles.google__or}>Lub</p>
                <button className={styles.google__btn} onClick={loginWithGoogle}>
                    <SelectImg selectedImg={'gmail'} height={18}/>
                    {isLoading ?
                        <p>ładowanie</p> :
                        <p>Zaloguj się przez Google</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default LoginPage;