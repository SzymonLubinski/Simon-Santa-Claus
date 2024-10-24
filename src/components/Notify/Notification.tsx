
import {FC} from "react";
import {useDispatch} from "react-redux";
import {removeNotify} from "@/redux/notifySlice";
import {NotifyItem} from "@/types/other-types";
import styles from './Notification.module.scss';

interface Notification extends NotifyItem{
    id: number;
}


const Notification:FC<Notification> = ({ message, type, id }) => {
    const dispatch = useDispatch();

    let notifyTypeStyles: string | undefined;
    switch (type){
        case 'success':
            notifyTypeStyles = styles.notifySuccess;
            break;
        case 'failure':
            notifyTypeStyles = styles.notifyFailure;
            break;
        case 'warning':
            notifyTypeStyles = styles.notifyWarning;
            break;
    }

    return (
        <div className={`${styles.notify} ${notifyTypeStyles}`}
             role={'alert'}
        >

            <div className={styles.notify__message}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
                <p>{message}</p>
            </div>

            <button className={styles.notify__closeBtn}
                    onClick={() => dispatch(removeNotify(id))}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
            </button>
        </div>
    )
}

export default Notification;