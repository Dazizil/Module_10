'use client'
import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import CloseImage from '../icons/CloseImage';
import './popUpNotification.module.css';
import styles from "./popUpNotification.module.css";

interface PopUpNotificationProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
}

const PopUpNotification = ({message, isVisible, onClose}: PopUpNotificationProps) => {
    useEffect(() => {
        if (!document.getElementById('notification')) {
            const div = document.createElement('div');
            div.id = 'notification';
            document.body.appendChild(div);
        }
    }, []);

    const notificationRoot = document.getElementById('notification');

    if (!isVisible || !notificationRoot) {
        return null;
    }

    return createPortal(
        <div className={styles['popup-notification']}>
            <div className={styles['popup-message']}>{message}</div>
            <div onClick={onClose}>
                <CloseImage size={10}/>
            </div>
        </div>,
        notificationRoot
    );
};

export default PopUpNotification;