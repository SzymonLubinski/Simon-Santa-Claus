'use client'

import santaImg from '../../../public/images/logo.png';
import SessionInfo from "@/components/Header/SessionInfo";
import Image from "next/image";
import LoadingBG from "@/components/Portal/LoadingBG";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './Lay.module.scss';


interface LayProps{
    userName: string | null | undefined;
}

const Lay = ({userName}: LayProps) => {
    const portalActive = useSelector((state: RootState) => state.portal.active);

    return (
        <header className={styles.header}>
            {portalActive && <LoadingBG/>}
            <section className={styles.header__logo}>
                <Image src={santaImg} alt={'company logo'}/>
            </section>
            <SessionInfo userName={userName}/>
        </header>
    )
}

export default Lay;