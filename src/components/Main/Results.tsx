
import {FC} from "react";
import styles from './Results.module.scss';


interface ResultsProps{
    you: DrawResult;
}

const Results:FC <ResultsProps> = ({you}) => {

    return (
        <div className={styles.resultContainer}>
            <h1 className={styles.resultContainer__welcome}>Cześć {you.name}</h1>
            <p className={styles.resultContainer__info}>
                Osoba której wręczysz prezent to {you.endowed.name}
            </p>
        </div>
    )
}

export default Results;