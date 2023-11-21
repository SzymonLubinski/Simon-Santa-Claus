'use client'

import {FC, useState} from "react";
import {signIn} from "next-auth/react";
import SelectImg from "@/components/UI/SelectImg";
import FormRegister from "@/components/Main/FormRegister";
import FormLogin from "@/components/Main/FormLogin";
import styles from './LoginPage.module.scss';
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";


const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [formType, setFormType] = useState('login');

    async function loginWithGoogle() {
        setLoading(true);
        try {
            await signIn('google');
        } catch (err) {
            console.log('something wrong')
        } finally {
            setLoading(false);
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
                    {loading ?
                        <p>ładowanie</p> :
                        <p>Zaloguj się przez Google</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default LoginPage;