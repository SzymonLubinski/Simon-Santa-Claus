'use client'

import {useForm, SubmitHandler, useFieldArray} from "react-hook-form";
import {FC, useEffect, useState} from "react";
import axios from "axios";
import Alert from "@/components/UI/Alert";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";
import styles from './CreateGroupForm.module.scss';


interface IFormInput {
    groupName: string;
    maxBudget: number;
    minBudget: number;
    loggedFriends: { name: string | boolean }[];
    externalFriends: { name: string }[];
    giftDay: string;
}

interface CreateGroupFormProps {
    friends: User[];
}


const CreateGroupForm: FC<CreateGroupFormProps> = ({friends}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [notEnoughMembers, setNotEnoughMembers] = useState<boolean>(false);
    const {register, reset, handleSubmit, formState, watch, control} = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const loggedFriendsWithoutNull = data.loggedFriends.filter(
            friend => friend.name !== false
        )
        const loggedFriendIds = loggedFriendsWithoutNull.map((friend) => {
            return friend.name
        })
        const externalFriendNames = data.externalFriends.map((friend) => {
            return friend.name
        })
        if (loggedFriendIds.length + externalFriendNames.length < 2) {
            console.log('za mało użytkowników')
            setNotEnoughMembers(true);
            return;
        }
        await axios.post('/api/groups/add', {
            data: {
                externalFriends: externalFriendNames,
                loggedFriends: loggedFriendIds,
                name: data.groupName,
                minBudget: data.minBudget,
                maxBudget: data.maxBudget,
                giftDay: data.giftDay,
            }
        })
        router.refresh();
    }

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'externalFriends'
    });

    const watchFieldArray = watch('externalFriends');
    const controlledFields = fields.map((field, i) => {
        return {
            ...field,
            ...watchFieldArray[i],
        }
    })
    const addFriendHandler = () => {
        if (watchFieldArray.length > 0) {
            if (watchFieldArray[watchFieldArray.length - 1].name === '') {
                return;
            }
        }
        append({name: ''});
    };
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                maxBudget: 0,
                minBudget: 0,
                loggedFriends: [],
                externalFriends: [],
                groupName: '',
            })
        }
    }, [formState, reset])

    dispatch(setOff());
    return (
        <div className={styles.createGroupContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label className={styles.inputContainer__label}>
                        Nazwa grupy
                    </label>
                    <input className={styles.inputContainer__input}
                           aria-invalid={formState.errors.groupName ? 'true' : 'false'}
                           {...register('groupName', {
                               required: true,
                               minLength: 3,
                               maxLength: 30,
                           })}
                    />
                    <div className={styles.inputContainer__error}>
                        {formState.errors.groupName?.type === 'required' && (
                            <Alert alertText={'name of the group is required'}/>
                        )}
                    </div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputContainer__label}>
                            Minimalny budżet
                        </label>
                        <input className={styles.inputContainer__input}
                               type={'number'}
                            // aria-invalid={formState.errors.minBudget ? 'true' : 'false'}
                               {...register('minBudget', {
                                   required: true,
                                   min: 1,
                                   max: 1000000,
                               })}
                        />
                        <div className={styles.inputContainer__error}>
                            {formState.errors.minBudget?.type === 'required' && (
                                <Alert alertText={'min budget is required'}/>
                            )}
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputContainer__label}>
                            Maksymalny budżet
                        </label>
                        <input className={styles.inputContainer__input}
                            // aria-invalid={formState.errors.maxBudget ? 'true' : 'false'}
                               {...register('maxBudget', {
                                   required: true,
                                   min: 1,
                                   max: 1000000,
                               })}
                        />
                        <div className={styles.inputContainer__error}>
                            {formState.errors.maxBudget?.type === 'required' && (
                                <Alert alertText={'max budget is required'}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputContainer__label}>
                        Data wręczania prezentów
                    </label>
                    <input className={styles.inputContainer__input}
                           type={'date'}
                        // aria-invalid={formState.errors.giftDay ? 'true' : 'false'}
                           {...register('giftDay', {
                               required: true,
                               minLength: 3,
                               maxLength: 30,
                           })}
                    />
                    <div className={styles.inputContainer__error}>
                        {formState.errors.giftDay?.type === 'required' && (
                            <Alert alertText={'gift day is required'}/>
                        )}
                    </div>
                </div>
                <div className={styles.friends}>
                    {friends.length > 0 ? (
                        <div className={styles.friends__checkboxes}>
                            <ul className={styles.friends__list}>
                                {friends.map((friend, i) => {
                                    return (
                                        <li key={friend.id} className={styles.friends__card}>
                                            <p className={styles.friends__name}>{friend.name}</p>
                                            <div className={styles.slideCheckbox}>
                                                <input type={'checkbox'}
                                                       id={friend.id}
                                                       value={friend.id}
                                                       {...register(`loggedFriends.${i}.name`)}

                                                />
                                                <label htmlFor={friend.id}></label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <p>Aktualnie nie masz znajomych w serwisie Simon Santa</p>
                            <p>Możesz dodać ich w sekcji Dodaj Znajomego</p>
                        </div>
                    )}
                    <div className={styles.externalFriends}>
                        <div className={styles.externalFriends__add}>
                            {controlledFields.map((field, i) => {
                                return (
                                    <div key={i} className={styles.externalFriends__container}>
                                        <input className={styles.externalFriends__input}
                                               {...register(`externalFriends.${i}.name`, {
                                                   required: true,
                                                   minLength: 3,
                                                   maxLength: 30,
                                               })}/>
                                        <button className={styles.externalFriends__del}
                                                type={"button"}
                                                onClick={() => remove(i)}
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                )
                            })}
                            <button className={styles.externalFriends__btn}
                                    type={"button"}
                                    onClick={() => addFriendHandler()}
                            >
                                Dodaj kolejnego uczestnika
                            </button>
                        </div>
                    </div>
                </div>
                {notEnoughMembers && (
                    <div className={styles.notEnough}>
                        <Alert alertText={'Not enough members (min 3)'}/>
                    </div>
                )}
                <div className={styles.submit}>
                    <input className={styles.submit__input} type={'submit'}/>
                </div>
            </form>
        </div>
    )
}

export default CreateGroupForm;