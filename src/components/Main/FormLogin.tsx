'use client'

import {signIn} from "next-auth/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginFormTypes} from "@/types/other-types";
import SendBtn from "@/components/UI/SendBtn";
import {useState} from "react";
import Alert from "@/components/UI/Alert";
import axios from "axios";
import  { AxiosError } from 'axios';
import styles from './Form.module.scss';
import LoadingBG from "@/components/Portal/LoadingBG";


const FormLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState} = useForm<LoginFormTypes>();
    const [loginError, setLoginError] = useState<string | null | undefined>(null);
    const onSubmit: SubmitHandler<LoginFormTypes> = async (data) => {

        try {
            const res = await axios.post('api/authorization', {credentials: data})
            if (res?.status === 200){
                setLoading(true);
                await signIn('credentials', {...data, redirect:true});
            } else {
                console.log('res:', res)
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (typeof axiosError.response?.data === "string"){
                setLoginError(axiosError.response?.data)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {loading && <LoadingBG/>}
            <h1 className={styles.form__title}>Logowanie</h1>
            <label className={styles.form__formLabel}>Email</label>
            <input type={'email'} {...register('email', {
                required: true,
                minLength: 3,
                maxLength: 30,
            })}/>
            <label className={styles.form__formLabel}>Hasło</label>
            <input type={'password'} {...register('password', {
                required: true,
                minLength: 3,
                maxLength: 30,
            })}/>
            <div className={styles.form__error}>
                <div className={styles.form__error__content}>
                    {formState.errors.email?.type === 'required' && (
                        <Alert alertText={'podaj email'}/>
                    )}
                    {formState.errors.password?.type === 'required' && (
                        <Alert alertText={'podaj hasło'}/>
                    )}
                    {loginError && (
                        <Alert alertText={loginError}/>
                    )}
                </div>
            </div>
            <div className={styles.form__submit}>
                <label htmlFor={'login'}>
                    <SendBtn text={'Zaloguj'}/>
                </label>
                <input id={'login'} type={'submit'}/>
            </div>
        </form>
    )
}

export default FormLogin;