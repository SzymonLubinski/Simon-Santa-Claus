'use client'

import santaImg from '../../../public/logo.png';
import SessionInfo from "@/components/Header/SessionInfo";
import {FC} from "react";
import styles from './Lay.module.scss';
import Image from "next/image";


interface LayProps{
    userName: string | null | undefined;
}

const Lay: FC<LayProps> = ({userName}) => {

    return (
        <header className={styles.header}>
            <section className={styles.header__logo}>
                <Image src={santaImg} alt={'company logo'}/>
            </section>
            <section className={styles.header__session}>
                <SessionInfo userName={userName}/>
            </section>
        </header>
    )
}

export default Lay;