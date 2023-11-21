"use client";

import React, {useRef} from "react";
import {createPortal} from 'react-dom'
import styles from './Portal.module.css';
import {BackdropType, ModalType, PortalTypes} from "@/types/other-types";


const Backdrop = (props: BackdropType) => {
    return (
        <div className={styles.backdrop} onClick={props.onClose}>

        </div>
    )
}
const ModalOverlay = (props: ModalType) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
};

export const Portal = (props: PortalTypes) => {
    const ref = useRef<Element | null>(null);

    ref.current = document.querySelector<HTMLElement>("#portal");

    return (
        <div>
            {ref.current && createPortal(
                <Backdrop onClose={props.onClose}/>,
                ref.current)}
            {ref.current && createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                ref.current)}
        </div>
    )
}
