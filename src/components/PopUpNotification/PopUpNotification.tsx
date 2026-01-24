// PopUpNotification.tsx
import React from 'react';
import {createPortal} from 'react-dom';
import CloseImage from '../icons/CloseImage';
import './popUpNotification.css';

interface PopUpNotificationProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
}

const PopUpNotification = ({message, isVisible, onClose}: PopUpNotificationProps) => {
    const notificationRoot = document.getElementById('notification');

    if (!notificationRoot || !isVisible) {
        return null;
    }

    return createPortal(
        <div className="popup-notification">
            <div className="popup-message">{message}</div>
            <div onClick={onClose}>
                <CloseImage size={10}/>
            </div>
        </div>,
        notificationRoot
    );
};

export default PopUpNotification;