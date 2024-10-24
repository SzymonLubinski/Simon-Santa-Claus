'use client'

import styles from './SendBtn.module.scss';

interface BtnProps {
    text: string;
    def?: () => void;
}

const SendBtn = ({text, def}: BtnProps) => {

    return (
        <button className={`${styles.button} ${styles.learnMore}`}
                onClick={def ? def : undefined}
        >
            <span className={styles.circle} aria-hidden="true">
                <span className={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span className={styles.buttonText}>{text}</span>
        </button>
    )
}

export default SendBtn;