'use client'

import Link from "next/link";
import Image from "next/image";
import SnowingBackground from "@/components/Main/SnowingBackground";
import Tree from "../../../public/images/christmas-1299374_1280.png";
import Chain from "../../../public/images/wieniec2.png";
import Wreath from "../../../public/images/wieniec.png";
import Flowchart from "@/components/Main/Flowchart";
import SelectImg from "@/components/UI/SelectImg";
import Instruction from "@/components/Main/Instruction";
import styles from './Home2.module.scss';


const Home2 = () => {

    return (
        <div>
            <SnowingBackground>
                <div className={styles.welcome}>
                    <h1>Simon Santa Claus</h1>
                    <div className={styles.welcome__1}>
                        <div className={styles.welcome__2}>
                            <p>Wesołych świąt</p>
                            <p>I szczęśliwego</p>
                            <p>Nowego Roku!</p>
                        </div>
                        <div className={styles.welcome__3}>
                            <Image src={Tree}
                                   alt={'christmas tree'}
                                   priority={true}
                            />
                        </div>
                    </div>
                </div>
            </SnowingBackground>
            <div className={styles.chain}>
                <Image src={Chain} alt={'chain'} priority={true}/>
            </div>
            <div className={styles.container}>
                <Flowchart/>
                <Instruction/>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footer__imageContainer}>
                    <Image src={Wreath} alt={'wieniec bożonarodzeniowy'} priority={true}/>
                </div>
                <div className={styles.footer__content}>
                    <div className={styles.footer__link}>
                        <Link href={'https://github.com/SzymonLubinski'}>
                            <SelectImg selectedImg={'github'} height={50}/>
                        </Link>
                    </div>
                    <div className={styles.footer__link}>
                        <Link href={'https://nextjs.org/'}>
                            <SelectImg selectedImg={'nextjs'} height={50}/>
                        </Link>
                    </div>
                    <div className={styles.footer__link}>
                        <Link href={'https://www.linkedin.com/in/szymon-lubi%C5%84ski-5b6a62243'}>
                            <SelectImg selectedImg={'linkedin'} height={50}/>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home2;