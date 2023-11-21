'use client'

import {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, {AxiosError} from "axios";
import {z} from 'zod';
import {addFriendValidator} from "@/lib/validation/add-friend";
import styles from './AddFriendButton.module.scss';
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";


interface AddFriendButtonProps {
}

type FormData = z.infer<typeof addFriendValidator>


const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
    const dispatch = useDispatch();
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
    const {register, reset, handleSubmit, formState, setError} = useForm<FormData>({
        resolver: zodResolver(addFriendValidator)
    })

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({email});
            await axios.post('/api/friends/add', {
                email: validatedEmail,
            })
            setShowSuccessState(true);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError('email', {message: err.message});
                return;
            }
            if (err instanceof AxiosError) {
                setError('email', {message: err.response?.data});
                return;
            }
            setError('email', {message: 'something went wrong'})
        }
    }

    const onSubmit = async (data: FormData) => {
        await addFriend(data.email);
    }

    dispatch(setOff());
    return (
        <div className={styles.container}>
            <div className={styles.container__title}>
                <h1>Dodaj znajomego</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={styles.container__form}>
                <label htmlFor={'email'}>
                    Dodaj przez email
                </label>
                <input type={'text'}
                       placeholder={'example@gmail.com'}
                       {...register('email')}
                />
                <input type={'submit'}/>
                <p>{formState.errors?.email?.message}</p>
                {showSuccessState && <p> Wysłano zaproszenie! </p>}
            </form>
        </div>
    )
}

export default AddFriendButton;