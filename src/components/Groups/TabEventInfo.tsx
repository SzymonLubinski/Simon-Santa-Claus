'use client'

import styles from './TabEventInfo.module.scss';
import Calendar from "@/components/UI/Calendar";
import dayjs from "dayjs";
import dayjsBusinessDays from 'dayjs-business-days2';
dayjs.extend(dayjsBusinessDays);


interface GroupInfoProps {
    group: GroupType;
}


const TabEventInfo = ({group}: GroupInfoProps) => {
    const giftDay = dayjs(group.giftDay);

    return (
        <div className={styles.groupInfo}>
            <h1>{group.name}</h1>
            <div className={styles.budgetInfo}>
                <div className={styles.budgetInfo__cart}>
                    <h3>Minimalny budżet</h3>
                    <h2>{group.minBudget} zł</h2>
                </div>
                <div className={styles.budgetInfo__cart}>
                    <h3>maxymalny budżet</h3>
                    <h2>{group.maxBudget} zł</h2>
                </div>
                <div className={styles.budgetInfo__cart}>
                    <p className={styles.budgetInfo__text}>Dni do dnia wręczania prezentów:</p>
                    <p className={styles.budgetInfo__days}>{giftDay.diff(dayjs(), 'days')}</p>
                </div>
                <div className={styles.budgetInfo__cart}>
                    <p className={styles.budgetInfo__text}>Dni robocze do dnia wręczania prezentów:</p>
                    <p className={styles.budgetInfo__days}>{giftDay.businessDiff(dayjs())}</p>
                </div>
            </div>
            <Calendar giftDay={giftDay}/>
        </div>
    )
}

export default TabEventInfo;
