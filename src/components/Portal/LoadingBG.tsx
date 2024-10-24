'use client'

import {Portal} from "@/components/Portal/Portal";
import LoadingCircle from "@/components/UI/LoadingCircle";
import styles from './LoadingBG.module.scss';

const LoadingBG = () => {

    return (
        <Portal>
            <div className={styles.container}>
                <LoadingCircle/>
            </div>
        </Portal>
    )
}

export default LoadingBG;