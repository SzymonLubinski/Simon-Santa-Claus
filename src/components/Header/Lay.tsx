'use client'

import santaImg from '../../../public/logo.png';
import SessionInfo from "@/components/Header/SessionInfo";
import {FC} from "react";
import {Session} from "next-auth";
import styles from './Lay.module.scss';
import Image from "next/image";


interface LayProps{
    session: Session | null;
}

const Lay: FC<LayProps> = ({session}) => {

    return (
        <header className={styles.header}>
            <section className={styles.header__logo}>
                <Image src={santaImg} alt={'company logo'}/>
            </section>
            <section className={styles.header__session}>
                <SessionInfo session={session}/>
            </section>
        </header>
    )
}

export default Lay;