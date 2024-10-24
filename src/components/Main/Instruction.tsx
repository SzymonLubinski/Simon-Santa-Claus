import styles from './Instruction.module.scss';
import Link from "next/link";
import Image from "next/image";
import Step1 from "../../../public/images/step1m.png";
import Step2 from "../../../public/images/step2m.png";
import Step3 from "../../../public/images/step3m.png";
import Step4 from "../../../public/images/step4m.png";


interface InstructionProps {
}


const Instruction = ({}: InstructionProps) => {

    return (
        <div className={styles.instructions}>
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
    )
}

export default Instruction;