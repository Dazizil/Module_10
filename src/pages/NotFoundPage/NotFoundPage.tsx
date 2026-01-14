import React from 'react';
import './notFoundPage.css'
import NotFoundImage from '../../assets/NotFoundImage.svg'
import DarkNotFoundImage from '../../assets/DarkNotFoundImage.svg'
import {useTheme} from "../../context/ThemeContext";

const NotFoundPage = () => {
    const {theme} = useTheme()
    return (
        <div className={'not-found'}>
            {theme === 'dark' ?
                <img className={'not-found__image'} src={NotFoundImage} alt="Page not found illustration"/>
            :
                <img className={'not-found__image'} src={DarkNotFoundImage} alt="Page not found illustration"/>
            }
            <div className={'not-found__title'}>Page not found</div>
        </div>
    );
};

export default NotFoundPage;