
import Lay from "@/components/Header/Lay";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import styles from './page.module.css'
import Home2 from "@/components/Main/Home2";


const Page = async () => {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            <Lay userName={session?.user.name}/>
            <Home2/>
        </main>
    )
}

export default Page;