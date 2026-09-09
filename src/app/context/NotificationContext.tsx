'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import PopUpNotification from "../components/PopUpNotification/PopUpNotification";

interface INotificationContext {
    showNotification: (message: string) => void
}

const NotificationContext = createContext<INotificationContext>({
    showNotification: () => {
    }
});

export function NotificationProvider({children}: { children: ReactNode }) {
    const [notification, setNotification] = useState<{ message: string; isVisible: boolean }>({
        message: '',
        isVisible: false,
    });

    function showNotification (message: string) {
        setNotification({message, isVisible: true});
        setTimeout(() => {
            setNotification((prev) => ({...prev, isVisible: false}));
        }, 5000);
    }

    function handleClose () {
        setNotification((prev) => ({ ...prev, isVisible: false }));
    }

    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
            <PopUpNotification
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={handleClose}
            />
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    return useContext(NotificationContext);
}