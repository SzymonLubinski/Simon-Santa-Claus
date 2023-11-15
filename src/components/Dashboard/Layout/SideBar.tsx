'use client'
import {FC, useEffect, useState} from "react";
import Link from "next/link";
import SelectImg from "@/components/UI/SelectImg";
import SignOutButton from "@/components/UI/SignOutButton";
import FriendsRequestsSidebarOptions from "@/components/Dashboard/Friends/FriendsRequestsSidebarOptions";
import SideBarChatList from "@/components/Dashboard/Layout/SideBarChatList";
import SideBarGroupList from "@/components/Dashboard/Layout/SideBarGroupList";
import styles from './SideBar.module.scss';


interface SidebarOptions {
    friends: User[];
    userName: string | null | undefined;
    userId: string;
    groups: GroupType[];
    unseenRequestCount: number;
}


const SideBar: FC<SidebarOptions> = (
    {friends, userId, userName, groups, unseenRequestCount}
) => {
    const [width, setWidth] = useState(0)
    const [showLayout, setShowLayout] = useState<boolean>(true);
    const [showToggle, setShowToggle] = useState<boolean>(width < 760);
    const layoutHandler = () => {
        setShowLayout(!showLayout);
    }

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)

            if (width < 660 && !showToggle) {
                setShowToggle(true);
                console.log('1')
            }
            if (width >= 660 && showToggle) {
                setShowToggle(false);
                console.log('2')
            }
            if (width >= 660 && !showLayout) {
                setShowLayout(true);
                console.log('3')
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [width, showLayout, showToggle])

    return (
        <div className={showLayout ? styles.container : `${styles.container} ${styles.hideToLeft}`}>
            <div className={styles.container__logo}>
                <SelectImg selectedImg={'santa'} height={100}/>
            </div>
            <ul className={styles.list}>
                <li className={styles.list__requests}>
                    <Link href={'/dashboard/add'} onClick={() => setShowLayout(false)}>
                        <div className={styles.list__add}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <p>Dodaj znajomego</p>
                        </div>
                    </Link>
                    <FriendsRequestsSidebarOptions initialUnseenRequestCount={unseenRequestCount}
                                                   sessionId={userId}
                    />
                </li>
                <li className={styles.list__friends}>
                    {friends.length > 0 ? (
                        <h3>Twoi znajomi</h3>
                    ) : (<p>Jeszcze nie masz znajomych</p>)}
                    <SideBarChatList friends={friends}
                                     userId={userId}
                                     hideLayout={layoutHandler}
                    />
                </li>
                <li className={styles.list__groups}>
                    <Link href={'/dashboard/create-group'} onClick={() => setShowLayout(false)}>
                        <div className={styles.list__add}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path
                                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                            </svg>
                            <p>Stwórz grupę</p>
                        </div>
                    </Link>
                    {groups.length > 0 ? (
                        <h3>Twoje grupy</h3>
                    ) : (<p>Jeszcze nie należysz do żadnej grupy</p>)}
                    <SideBarGroupList groups={groups}
                                      sessionId={userId}
                                      hideLayout={layoutHandler}
                    />
                </li>
                <li className={styles.list__sessionInfo}>
                    <div className={styles.sessionInfo}>
                        <div className={styles.sessionInfo__img}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path
                                    d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                            </svg>
                        </div>
                        <div className={styles.sessionInfo__info}>
                            <p>{userName}</p>
                        </div>
                        <div className={styles.sessionInfo__img}>
                            <SignOutButton/>
                        </div>
                    </div>
                </li>
            </ul>
            <div className={showLayout ? `${styles.toggle} ${styles.toggle__background}` : styles.toggle}
                 onClick={() => layoutHandler()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                </svg>
            </div>
        </div>
    )
}

export default SideBar;
