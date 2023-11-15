import SelectImg from "@/components/UI/SelectImg";
import Link from "next/link";
import Image from "next/image";
import Step1 from '../../../public/home/step1m.png';
import Step2 from '../../../public/home/step2m.png';
import Step3 from '../../../public/home/step3m.png';
import Step4 from '../../../public/home/step4m.png';
import Tree from '../../../public/christmas-1299374_1280.png';
import Wreath from '../../../public/home/wieniec.png';
import styles from './Home.module.scss'


const Home = () => {

    return (
        <div className={styles.homeContainer}>
            <div className={styles.wrapper}>
                <div className={`${styles.snow} ${styles.layer1} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer1}`}></div>
                <div className={`${styles.snow} ${styles.layer2} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer2}`}></div>
                <div className={`${styles.snow} ${styles.layer3} ${styles.a}`}></div>
                <div className={`${styles.snow} ${styles.layer3}`}></div>
            </div>
            <div className={styles.content}>
                <div className={styles.content__section}>
                    <div className={styles.content__welcome}>
                        <p>Zbliżają się święta?</p>
                        <p>Planujecie zorganizować coś w grupach?</p>
                        <p>Potrzebujecie komunikatora?</p>
                    </div>
                    <Image src={Tree} alt={'christmas tree'}/>
                </div>
                <div className={styles.content__section}>
                    <div className={styles.content__welcome}>
                        <h1>Simon Santa Claus to strona dla was!</h1>
                        {/*jakaś strzałeczka w dół przesuwająca zawartość*/}
                    </div>
                </div>
            </div>
            <div className={styles.chain}>
                <SelectImg selectedImg={'chain'} height={200}/>
            </div>
            <div className={styles.details}>
                <div className={styles.details__title}>
                    <p>Dzięki naszemu serwisowi szybko i sprawnie:</p>
                </div>
                <div className={styles.details__list}>
                    <ul className={styles.list}>
                        <li className={styles.list__item}>
                            <p>przeprowadzisz losowanie mikołajkowe</p>
                        </li>
                        <li className={styles.list__item}>
                            <p>skontaktujesz się z członkami grupy</p>
                        </li>
                        <li className={styles.list__item}>
                            <p>przypomnisz członkom o zbliżających się mikołajkach</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.scrollBar}>
                    <div className={styles.scrollBar__scroll}>
                        <ul className={styles.scrollBar__points}>
                            <li className={styles.scrollBar__point}>
                                <div></div>
                            </li>
                            <li className={styles.scrollBar__point}>
                                <div></div>
                            </li>
                            <li className={styles.scrollBar__point}>
                                <div></div>
                            </li>
                            <li className={styles.scrollBar__point}>
                                <div></div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.steps__step}>
                            <div className={styles.steps__info}>
                                <h1>Krok 1</h1>
                                <p>Zaloguj się do serwisu</p>
                                <p>
                                    Przynajmniej jedna osoba, która utworzy grupę powinna
                                    być zarejestrowana. Zrobisz to szybko i sprawnie tutaj:
                                </p>
                                <span className={styles.steps__link}>
                                    <Link href={'/login'}>
                                        Zaloguj się
                                    </Link>
                                </span>
                            </div>
                            <div className={styles.steps__img}>
                                <Image src={Step1} alt={'krok 1'}/>
                            </div>
                        </div>
                        <div className={styles.steps__step}>
                            <div className={styles.steps__info}>
                                <h1>Krok 2</h1>
                                <p>Zaproś znajomych</p>
                                <p>
                                    Jeśli twoi znajomi będą również zarejstrowani w naszym
                                    serwisie, możesz ich dodać. Dzięki temu będziecie mogli
                                    kontaktować się z nimi na specjalnym czacie.
                                </p>
                            </div>
                            <div className={styles.steps__img}>
                                <Image src={Step2} alt={'krok 2'}/>
                            </div>
                        </div>
                        <div className={styles.steps__step}>
                            <div className={styles.steps__info}>
                                <h1>Krok 3</h1>
                                <p>Stwórz grupę</p>
                                <p>
                                    Tworząc grupę możesz dodać do niej zalogowanych znajomych
                                    lub osoby niezalogowane poprostu podając ich imiona lub ksywki
                                </p>
                            </div>
                            <div className={styles.steps__img}>
                                <Image src={Step3} alt={'krok 3'}/>
                            </div>
                        </div>
                        <div className={styles.steps__step}>
                            <div className={styles.steps__info}>
                                <h1>Krok 4</h1>
                                <p>Przeprowadź losowanie</p>
                                <p>
                                    Nasza strona wylosuje każdemu członkowi osobę, której powinien
                                    kupić prezent. Twórca grupy może poinformować każdego emailem
                                    lub przesłać link do strony, na której członek znajdzie
                                    informacje kogo sam wylosował.
                                </p>
                            </div>
                            <div className={styles.steps__img}>
                            <Image src={Step4} alt={'krok 4'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footer__imageContainer}>
                    <Image src={Wreath} alt={'wieniec bożonarodzeniowy'}/>
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

export default Home;