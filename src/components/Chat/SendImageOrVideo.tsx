'use client'

import styles from './SendImageOrVideo.module.scss';
import {FC, useEffect} from "react";
import axios from "axios";
import {useForm, SubmitHandler} from "react-hook-form";
import Image from "next/image";


interface SendImageOrVideoProps {
    chatId: string;
}

type IFormInput = {
    selectedFiles: FileList;
}

const SendImageOrVideo: FC<SendImageOrVideoProps> = ({chatId}) => {
    const {register, handleSubmit, formState, watch, reset} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const formData = new FormData();
        for (const file of Array.from(data.selectedFiles ?? [])) {
            formData.append(file.name, file);
        }
        formData.append('chatId', chatId);
        await axios.post('/api/message/upload', formData)
    }
    const watchField = watch('selectedFiles');

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                selectedFiles: undefined,
            })
        }
    }, [formState, reset])

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label className={styles.form__uploadImage} htmlFor={'filePicker'}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M160 80H512c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16H490.8L388.1 178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 336H160c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16zM96 96V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                </label>
                <input id={'filePicker'}
                       type={"file"}
                       multiple
                       aria-invalid={formState.errors.selectedFiles ? 'true' : 'false'}
                       {...register('selectedFiles', {
                           required: true,
                       })}
                />
                {watchField && (
                    <div className={styles.form__uploadedList}>
                        {Array.from(watchField).map((file, i) => {
                            const url = URL.createObjectURL(file);
                            return (
                                <div key={i} className={styles.form__uploadedItem}>
                                    <Image src={url} alt={`img ${i}`} fill/>
                                </div>
                            )
                        })}
                    </div>
                )}
                {formState.errors.selectedFiles?.type === 'required' && (
                    <p>musisz wybrać plik!</p>
                )}
                <button className={styles.form__uploadBtn} type={"submit"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                </button>
            </form>
        </div>
    )
}

export default SendImageOrVideo;