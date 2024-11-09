'use client'

import styles from './MemberCard.module.scss';
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import SelectImg from "@/components/UI/SelectImg";
import SendBtn from "@/components/UI/SendBtn";


interface MemberCardProps {
    member: externalFriend | User;
    groupId: string;
    def: () => void;
    userAccess: boolean;
}

interface IFormInput {
    email: string;
}


const MemberCard = ({member, groupId, def, userAccess}: MemberCardProps) => {
    const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const hasEmail = member.email.length > 0;
    const linkToResult = `https://simon-santa-claus.vercel.app/draw/${groupId}---${member.id}`;

    const {register, reset, handleSubmit, formState} = useForm<IFormInput>()
    const router = useRouter();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await axios.post('/api/groups/update-email', {
            emailToAdd: data.email,
            friendName: member.name,
            groupId: groupId,
        })
        router.refresh();
        setShowEmailForm(false);
    }

    const showEmailBtnStyles = showEmailForm ?
        `${styles.memberSection} ${styles.memberSection__displayNone}` :
        `${styles.memberSection} ${styles.memberSection__pointer}`

    const copy = async () => {
        await navigator.clipboard.writeText(linkToResult);
        setCopied(true);
    }

    return (
        <li className={styles.card}>
            <div className={styles.imgContainer}>
                <div className={styles.imgContainer__circle}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                    </svg>
                </div>
            </div>
            <div className={styles.inBorder}>
                <div className={styles.inBorder__header}>
                    <h2>{member.name}</h2>
                    {hasEmail ? (
                        <h4>{member.email}</h4>
                    ) : (
                        <h4>Brak mail</h4>
                    )}
                </div>
                <div className={styles.inBorder__notification}>
                    {hasEmail && (
                        <div className={styles.memberSection}>
                            <SendBtn text={'wyślij @'}
                                     def={def}
                            />
                        </div>
                    )}
                    {!hasEmail && userAccess && (
                        <div className={showEmailBtnStyles}
                             onClick={() => setShowEmailForm(true)}>
                            Dodaj email
                        </div>
                    )}

                    {!hasEmail && !userAccess && (
                        <div className={`${styles.memberSection} ${styles.blocked}`}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                            </svg>
                        </div>
                    )}
                    {showEmailForm && (
                        <div className={styles.memberSection}>
                            <form className={styles.memberSection__form}
                                  onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.memberSection__form_container}>
                                    <input type={'email'}
                                           placeholder={'wpisz email...'}
                                           {...register('email')}
                                    />
                                    <button onClick={() => setShowEmailForm(false)}>
                                        X
                                    </button>
                                </div>
                                <SendBtn text={'dodaj @'}/>
                            </form>
                        </div>
                    )}
                </div>
                <div className={styles.inBorder__link}>

                    {userAccess ? (
                        <div className={styles.memberSection}>
                            <div className={styles.memberSection__link}>
                                <p className={styles.memberSection__link_text}>
                                    {copied ? (
                                        `Link jest przeznaczony tylko dla: ${member.name}`
                                    ) : (
                                        'Klinknij aby skopiować link'
                                    )}
                                </p>
                                <button onClick={() => copy()}
                                        className={
                                            `${styles.memberSection__link_btn} ${styles.memberSection__pointer}`
                                        }>
                                    {copied ? (
                                        <SelectImg selectedImg={'ok'} height={30}/>
                                    ) : (
                                        <SelectImg selectedImg={'copy'} height={30}/>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.memberSection} ${styles.blocked}`}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 448 512">
                                <path
                                    d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                            </svg>
                        </div>
                    )}

                </div>
            </div>
        </li>
    )
}

export default MemberCard;