

import styles from './SnowingBackground.module.scss';
import {ReactNode} from "react";


interface SBProps{
    children: ReactNode
}


const SnowingBackground = ({children}: SBProps) => {

    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.snow} ${styles.layer1} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer1}`}></div>
                <div className={`${styles.snow} ${styles.layer2} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer2}`}></div>
                <div className={`${styles.snow} ${styles.layer3} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer3}`}></div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </>
    )
}

export default SnowingBackground;