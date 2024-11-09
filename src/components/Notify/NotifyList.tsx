'use client'

import {useEffect, useRef} from "react";
import Notification from "@/components/Notify/Notification";
import {NotifyProps} from "@/types/other-types";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './NotifyList.module.scss'


interface NotifyListProps{
    position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
}

const NotifyList = ({position}: NotifyListProps) => {
    const listRef = useRef(null);
    const notifications = useSelector((state: RootState) => state.notify.notifications);
    const handleScrolling = (el: any) => {
        const isTopPosition = ["top-left", "top-right"].includes(position);
        if (isTopPosition) {
            el?.scrollTo(0, el.scrollHeight);
        } else {
            el?.scrollTo(0, 0);
        }
    }
    useEffect(() => {
        handleScrolling(listRef.current);
    }, )

    const sortedData = position.includes("bottom")
        ? [...notifications].reverse()
        : [...notifications];

    let positionStyles: string | undefined;
    switch (position){
        case 'top-left':
            positionStyles = styles.toastList__topLeft;
            break;
        case 'top-right':
            positionStyles = styles.toastList__topRight;
            break;
        case 'bottom-right':
            positionStyles = styles.toastList__bottomRight;
            break;
        case 'bottom-left':
            positionStyles = styles.toastList__bottomLeft;
            break;
    }

    return (
        sortedData.length > 0 && (
            <div className={`${styles.toastList} ${positionStyles}`}
                 aria-live={'assertive'}
                 ref={listRef}
            >
                {sortedData.map((notify: NotifyProps) => (
                    <Notification key={notify.id}
                                  id={notify.id}
                                  message={notify.message}
                                  type={notify.type}
                    />
                ))}
            </div>
        )
    )
}

export default NotifyList;