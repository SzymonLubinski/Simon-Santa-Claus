'use client'

import styles from './Results.module.scss';
import {useState} from "react";
import {useRouter} from "next/navigation";


interface ResultsProps {
    you: DrawResult;
}


const Results = ({you}: ResultsProps) => {
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const router = useRouter();
    console.log('you:', you)

    return (
        <div className={styles.resultContainer}>
            {confirmed ? (
                <div>
                    <h1 className={styles.resultContainer__welcome}>Cześć {you.donor.name}</h1>
                    <p className={styles.resultContainer__info}>
                        Osoba której wręczysz prezent to {you.recipient.name}
                    </p>
                </div>
            ) : (
                <div>
                    <h1>Czy to ty {you.donor.name}?</h1>
                    <div className={styles.choosingPool}>
                        <p className={styles.choosingPool__yes}
                           onClick={() => setConfirmed(true)}
                        >
                            Tak to ja!
                        </p>
                        <p className={styles.choosingPool__no}
                           onClick={() => router.push('/')}
                        >
                            Pomyłka
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Results;