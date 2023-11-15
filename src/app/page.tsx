
import {FC} from 'react';
import styles from './page.module.css'
import Lay from "@/components/Header/Lay";
import Home from "@/components/Main/Home";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";


const Page: FC = async () => {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            <Lay session={session}/>
            <Home/>
        </main>
    )
}

export default Page;