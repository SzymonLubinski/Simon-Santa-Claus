import styles from './Alert.module.scss';
import {FC} from "react";


interface AlertProps{
    alertText: string;
    // direction: 'up' | 'down' | 'left' | 'right';
    // distance: number;
}

const Alert:FC<AlertProps> = ({alertText}) => {
    return (
        <div className={styles.alert}>
            <p>{alertText}</p>
        </div>
    )
}

export default Alert;