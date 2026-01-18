import React, {useEffect} from 'react';
import './popUpNotification.css';
import CloseImage from "../icons/CloseImage";

interface PopUpNotificationProps {
    message: string,
    isVisible: boolean,
    onClose: () => void
}

const PopUpNotification = ({message, isVisible, onClose}: PopUpNotificationProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`popup-notification popup`}>
            <div className="popup-message">{message}</div>
            <div onClick={onClose}>
                <CloseImage size={8}/>
            </div>
        </div>
    );
};

export default PopUpNotification;