'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {RegisterFormTypes} from "@/types/other-types";
import styles from './Form.module.scss';
import SendBtn from "@/components/UI/SendBtn";
import {FC} from "react";


interface FormRegisterProps{
    toLogin: () => void;
}

const FormRegister:FC<FormRegisterProps> = ({toLogin}) => {
    const {register, reset, handleSubmit, formState, watch, control} = useForm<RegisterFormTypes>();
    const onSubmit: SubmitHandler<RegisterFormTypes> = async (data) => {
        try {
            await axios.post('/api/register', {
                data: data
            });
            toLogin();
        } catch (err){
            console.log('err: ', err.response.data)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1 className={styles.form__title}>Rejestracja</h1>
            <label className={styles.form__formLabel}>Email</label>
            <input type={'email'} {...register('email')}/>
            <label className={styles.form__formLabel}>Nazwa użytkownika</label>
            <input type={'text'} {...register('username')}/>
            <label className={styles.form__formLabel}>Hasło</label>
            <input type={'password'} {...register('password')}/>
            <div className={styles.form__submit}>
                <label htmlFor={'register'}>
                    <SendBtn text={'Zarejestruj'}/>
                </label>
                <input id={'register'} type={'submit'}/>
            </div>
        </form>
    )
}

export default FormRegister;