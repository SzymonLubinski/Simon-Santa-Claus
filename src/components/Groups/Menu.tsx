'use client'

import styles from './Menu.module.scss';
import {FC, useState} from "react";
import Link from "next/link";
import MemberList from "@/components/Groups/MemberList";
import GroupInfo from "@/components/Groups/GroupInfo";
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";


interface MenuProps{
    group: GroupType;
    drawResults: DrawResult[] | null;
    areYouCreator: boolean;
}


const Menu: FC<MenuProps> = ({group, drawResults, areYouCreator}) => {
    const [showingSection, setShowingSection] = useState<string>('list');
    const dispatch = useDispatch();

    dispatch(setOff());
    return (
        <div className={styles.menu}>
            <h1>{group.name}</h1>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <Link href={`/dashboard/chat/${group.id}`}>
                        Czat Grupowy
                    </Link>
                </div>
                <div onClick={() => setShowingSection('info')} className={styles.card}>
                    <p>Info Grupowe</p>
                    {showingSection === 'info' && (
                        <div className={styles.card__isActive}/>
                    )}
                </div>
                <div onClick={() => setShowingSection('list')} className={styles.card}>
                    <p>Lista Członków</p>
                    {showingSection === 'list' && (
                        <div className={styles.card__isActive}/>
                    )}
                </div>
            </div>
            {showingSection === 'list' && (
                <MemberList group={group} drawResults={drawResults} areYouCreator={areYouCreator}/>
            )}
            {showingSection === 'info' && (
                <GroupInfo group={group}/>
            )}
        </div>
    )
}

export default Menu;