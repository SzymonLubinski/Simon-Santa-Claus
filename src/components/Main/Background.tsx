'use client'

import styles from './Background.module.scss';
import {FC, ReactNode} from "react";
import Wreath from '../../../public/backgroundWreath.jpg';
import Image from "next/image";


interface BackgroundProps{
    children: ReactNode;
}


const Background: FC<BackgroundProps> = ({children}) => {

    return (
        <div className={styles.background}>
            <div className={styles.background__header}>
                <h1>Simon Santa Claus</h1>
            </div>
            <div className={styles.background__imgContainer}>
                <Image src={Wreath} alt={'wieniec bożonarodzeniowy'}/>
            </div>
            <div className={styles.background__content}>
                {children}
            </div>
        </div>
    )
}

export default Background;