
import {ReactNode} from 'react';
import SideBar from "@/components/Dashboard/Layout/SideBar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {notFound} from "next/navigation";
import {getFriendsByUserId, getGroupsByUserId} from "@/helpers/get-friends";
import styles from './dashboard.module.scss';
import {fetchRedis} from "@/helpers/redis";

interface LayoutProps {
    children: ReactNode
}


const Layout = async ({children}: LayoutProps) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();
    const friends = await getFriendsByUserId(session.user.id);
    const groups = await getGroupsByUserId(session.user.id) as GroupType[];

    const unseenRequestCount = (await fetchRedis(
        'smembers',
        `user:${session.user.id}:incoming_friend_requests`
    ) as User[]).length;

    return (
        <div className={styles.layoutContainer}>
            <SideBar friends={friends}
                     userId={session.user.id}
                     userName={session.user.name}
                     unseenRequestCount={unseenRequestCount}
                     groups={groups}
            />
            <aside className={styles.layoutContainer__aside}>
                {children}
            </aside>
        </div>
    )
}

export default Layout;