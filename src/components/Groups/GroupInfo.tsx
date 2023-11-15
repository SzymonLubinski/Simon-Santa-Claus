

import {FC, useEffect, useState} from "react";
import styles from './GroupInfo.module.scss';
import Calendar from "@/components/UI/Calendar";
import dayjs from "dayjs";
import dayjsBusinessDays from 'dayjs-business-days2';
import {checkEveryoneHasEmail} from "@/helpers/functions";
dayjs.extend(dayjsBusinessDays);


interface GroupInfoProps {
    group: GroupType;
}


const GroupInfo: FC<GroupInfoProps> = ({group}) => {
    const giftDay = dayjs(group.giftDay);
    const [hasEveryoneEmail, setHasEveryoneEmail] = useState<boolean>(true);
    useEffect(() => {
        setHasEveryoneEmail(
            checkEveryoneHasEmail(group.externalFriends)
        );
    }, [group]);

    return (
        <div className={styles.groupInfo}>
            <div className={styles.budgetInfo}>
                <div className={styles.budgetInfo__cart}>
                    <h3>Minimalny budżet</h3>
                    <h2>{group.minBudget}</h2>
                </div>
                <div className={styles.budgetInfo__cart}>
                    <h3>maxymalny budżet</h3>
                    <h2>{group.maxBudget}</h2>
                </div>
            </div>
            <div className={styles.budgetInfo}>
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
            <div>
                {!hasEveryoneEmail && (
                    <p>
                        Pamiętaj, że jeśli użytownik nie ma wprowadzonego adresu email,
                        nie mamy możliwości wysłać mu powiadomienia, kogo wylosował.
                        Jedynym sposobem pozostanie przekazanie indywidualnego linku,
                        pod którym znajdzie informacje komu kupi prezent.
                    </p>
                )}
            </div>
        </div>
    )
}

export default GroupInfo;
