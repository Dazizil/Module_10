import React from 'react';
import './notFoundPage.css'
import {useTheme} from "../../context/ThemeContext";
import NotFoundIcon from "../../components/icons/NotFoundIcon";

const NotFoundPage = () => {
    const {theme} = useTheme()
    return (
        <div className={'not-found'}>
            <NotFoundIcon fill={theme === 'dark' ? 'white' : 'black'}/>
            <div className={'not-found__title'}>Page not found</div>
        </div>
    );
};

export default NotFoundPage;