'use client'

import {ReactNode} from "react";
import Wreath from '../../../public/images/backgroundWreath.jpg';
import Image from "next/image";
import Link from "next/link";
import styles from './Background.module.scss';


interface BackgroundProps{
    children: ReactNode;
}


const Background = ({children}: BackgroundProps) => {

    return (
        <div className={styles.background}>
            <div className={styles.background__header}>
                <Link href={'/'}>
                    <h3>Simon Santa Claus</h3>
                </Link>
            </div>
            <div className={styles.background__imgContainer}>
                <Image src={Wreath}
                       alt={'wieniec bożonarodzeniowy'}
                       priority
                />
            </div>
            <div className={styles.background__content}>
                {children}
            </div>
        </div>
    )
}

export default Background;