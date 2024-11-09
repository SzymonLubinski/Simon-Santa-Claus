'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import React, {FC, useEffect} from "react";
import axios from "axios";
import styles from './ChatInput.module.scss';
import SendImageOrVideo from "@/components/Chat/SendImageOrVideo";


interface IFormInput {
    messageText: string;
}

interface ChatInputProps {
    chatPartner: User | RawGroupType;
    chatId: string
    chatType: string;
}


const ChatInput: FC<ChatInputProps> = ({chatPartner, chatId, chatType}) => {
    const {register, handleSubmit, formState, reset} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!data.messageText) return;
        try {
            await axios.post('/api/message/send', {
                text: data.messageText,
                chatId: chatId,
                chatType,
            })
        } catch (err) {

        }
    }
    const enterSend = (e: React.KeyboardEvent<HTMLFormElement>) => {
        const target = e.target as HTMLTextAreaElement
        if (e.key === "Enter" && !e.shiftKey) {
            target.blur();
            const data = {messageText: target.value};
            reset({
                messageText: '',
            })
            return (onSubmit(data));
        }
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                messageText: '',
            })
        }
    }, [formState, reset])

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={enterSend}
                  className={styles.form}
            >
                <textarea placeholder={`napisz do ${chatPartner.name}...`}
                          className={styles.form__textInput}
                          aria-invalid={formState.errors.messageText ? 'true' : 'false'}
                          {...register('messageText', {
                              required: true,
                              minLength: 1,
                              maxLength: 1000000,
                          })}
                />
                {/*<TextareaAutosize autoFocus*/}
                {/*                  className={styles.form__textInput}*/}
                {/*                  {...register('messageText', {*/}
                {/*                      required: true,*/}
                {/*                      minLength: 1,*/}
                {/*                      maxLength: 1000000,*/}
                {/*                  })}*/}
                {/*/>*/}
                <button className={styles.form__post} type={'submit'}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                </button>
            </form>
            {/*<div className={styles.upload}>*/}
            {/*    <SendImageOrVideo chatId={chatId}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default ChatInput;