'use client'

import styles from './Menu.module.scss';
import {useState} from "react";
import Link from "next/link";
import TabMemberList from "@/components/Groups/TabMemberList";
import TabEventInfo from "@/components/Groups/TabEventInfo";
import {useDispatch} from "react-redux";
import {setOff} from "@/redux/portalSlice";
import DashboardTab from "@/components/Groups/DashboardTab";
import TabChristmasTree from "@/components/Groups/TabChristmasTree";


interface MenuProps {
    group: GroupType;
    drawResults: DrawResult[];
    userId: string;
}


const Menu = ({group, drawResults, userId}: MenuProps) => {
    const dispatch = useDispatch();
    dispatch(setOff());

    const [showingSection, setShowingSection] = useState<string>('info');

    return (
        <div className={styles.menu}>
            <header className={styles.header}>
                <div className={styles.header__bookmark}>
                    <Link href={`/dashboard/chat/${group.id}`}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div onClick={() => setShowingSection('info')}
                     className={`${styles.header__bookmark} ${showingSection === 'info' && styles.header__bookmark__active}`}>
                    <DashboardTab activeTab={"info"}/>
                </div>
                <div onClick={() => setShowingSection('event')}
                     className={`${styles.header__bookmark} ${showingSection === 'event' && styles.header__bookmark__active}`}>
                    <DashboardTab activeTab={"event"}/>
                </div>
                <div onClick={() => setShowingSection('list')}
                     className={`${styles.header__bookmark} ${showingSection === 'list' && styles.header__bookmark__active}`}>
                    <DashboardTab activeTab={"list"}/>
                </div>
            </header>

            {showingSection === 'info' && (
                <TabChristmasTree group={group} drawResults={drawResults} userId={userId}/>
            )}
            {showingSection === 'event' && (
                <TabEventInfo group={group}/>
            )}
            {showingSection === 'list' && (
                <TabMemberList group={group} drawResults={drawResults} userId={userId}/>
            )}
        </div>
    )
}

export default Menu;