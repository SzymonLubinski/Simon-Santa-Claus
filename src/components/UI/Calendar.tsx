'use client'

import {FC, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import range from "lodash-es/range"
import {isToDayOrGiftDay} from "@/helpers/functions";
import styles from './Calendar.module.scss';

const weekDays = [ "Nd","Pon", "Wt", "Śr", "Czw", "Pt", "Sob"]
interface CalendarProps {
    giftDay: Dayjs;
}

const Calendar:FC<CalendarProps> = ({giftDay}) => {
    const [dayObj, setDayObj] = useState(dayjs());
    const thisYear = dayObj.year();
    const thisMonth = dayObj.month();
    const daysInMonth = dayObj.daysInMonth();
    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day();
    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
    const weekDayOfLast = dayObjOfLast.day();
    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, 'month'))
    }
    const handleNext = () => {
        setDayObj(dayObj.add(1, 'month'))
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button type={"button"}
                        className={styles.nav}
                        onClick={handlePrev}
                >
                    {'<'}
                </button>
                <div className={styles.datetime}>
                    {dayObj.format('MMM DD YYYY')}
                </div>
                <button type={"button"}
                        className={styles.nav}
                        onClick={handleNext}
                >
                    {'>'}
                </button>
            </div>
            <div className={styles.weekContainer}>
                {weekDays.map((day, i) => (
                    <div key={i} className={styles.weekCell}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.dayContainer}>
                {range(weekDayOf1).map((i: number) => (
                    <div className={`${styles.dayCell} ${styles.dayCellFaded}`} key={i}>
                        {dayObjOf1.subtract(weekDayOf1 - i, 'day').date()}
                    </div>
                ))}
                {range(daysInMonth).map((i: number) => {
                    let dayStyle = styles.dayCell;
                    const checkedDay = dayjs(`${thisMonth+1}-${i+1}-${thisYear}`);

                    if (isToDayOrGiftDay(checkedDay, dayjs(), giftDay) === 'today'){
                        dayStyle = styles.toDay;
                    }
                    if (isToDayOrGiftDay(checkedDay, dayjs(), giftDay) === 'gift-day'){
                        dayStyle = styles.giftDay;
                    }

                    return (
                        <div key={i} className={dayStyle}>
                            {i + 1}
                        </div>
                    )
                })}

                {range(6 - weekDayOfLast).map((i: number) => (
                    <div key={i} className={`${styles.dayCell} ${styles.dayCellFaded}`}>
                        {dayObjOfLast.add(i + 1, "day").date()}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;