'use client'

import {useState} from "react";
import {signIn} from "next-auth/react";
import SelectImg from "@/components/UI/SelectImg";
import FormRegister from "@/components/Main/FormRegister";
import FormLogin from "@/components/Main/FormLogin";
import styles from './LoginPage.module.scss';
import {useDispatch} from "react-redux";
import {setOff, setOn} from "@/redux/portalSlice";
import NotifyList from "@/components/Notify/NotifyList";


const LoginPage = () => {
    const dispatch = useDispatch();
    const [formType, setFormType] = useState('login');

    async function loginWithGoogle() {
        dispatch(setOn());
        try {
            await signIn('google');
        } catch (err) {
            console.log('something wrong')
        }
    }

    const registrationCompleted = () => {
        setFormType('login');
    }

    dispatch(setOff());
    return (
        <div className={styles.container}>
            {formType === 'registration' && (
                <div className={styles.formContainer}>
                    <FormRegister toLogin={registrationCompleted}/>
                    <div className={styles.formContainer__link} onClick={() => setFormType('login')}>
                        <p>Jesteś już zalogowany?</p>
                        <p>Przejdź do strony logowania</p>
                    </div>
                </div>
            )}
            {formType === 'login' && (
                <div className={styles.formContainer}>
                    <FormLogin/>
                    <div className={styles.formContainer__link} onClick={() => setFormType('registration')}>
                        <p>Nie jesteś jeszcze zarejestrowany?</p>
                        <p>Przejdź do strony rejstacji</p>
                    </div>
                </div>
            )}
            <div className={styles.google}>
                <p className={styles.google__or}>Lub</p>
                <button className={styles.google__btn} onClick={loginWithGoogle}>
                    <SelectImg selectedImg={'gmail'} height={18}/>
                    <p>Zaloguj się przez Google</p>
                </button>
            </div>
            <NotifyList position={'top-left'}/>
        </div>
    )
}

export default LoginPage;