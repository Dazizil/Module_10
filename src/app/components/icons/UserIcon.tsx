import React from 'react';
import {useTheme} from "../../context/ThemeContext";

const UserIcon = () => {
    const {theme} = useTheme();
    const ICON_COLOR = theme === 'dark' ? 'white' : 'black';
    return (
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6 8C8.20914 8 10 6.20914 10 4C10 1.79086 8.20914 0 6 0C3.79086 0 2 1.79086 2 4C2 6.20914 3.79086 8 6 8Z"
                fill={ICON_COLOR}/>
            <path
                d="M6 9.33325C2.68781 9.33694 0.0036875 12.0211 0 15.3333C0 15.7014 0.298469 15.9999 0.666656 15.9999H11.3333C11.7015 15.9999 12 15.7014 12 15.3333C11.9963 12.0211 9.31219 9.33691 6 9.33325Z"
                fill={ICON_COLOR}/>
        </svg>
    );
};

export default UserIcon;