import styles from './SendBtn.module.scss';
import {FC} from "react";


interface BtnProps {
    text: string;
}

const SendBtn: FC<BtnProps> = ({text}) => {

    return (
        <button className={`${styles.button} ${styles.learnMore}`}>
            <span className={styles.circle} aria-hidden="true">
                <span className={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span className={styles.buttonText}>{text}</span>
        </button>
    )
}

export default SendBtn;