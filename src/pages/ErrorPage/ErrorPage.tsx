import React from 'react';
import './errorPage.css'
import ErrorIcon from "../../components/icons/ErrorIcon";
import {useTheme} from "../../context/ThemeContext";

const ErrorPage = () => {
    const {theme} = useTheme();
    return (
        <div className={'error'}>
            <div className={'error__image'}>
                <ErrorIcon fill={theme === 'dark' ? 'white' : 'black'}/>
            </div>
            <div className={'error__title'}>Oops...<br/>
                Something bad has just happened
            </div>
        </div>
    );
};

export default ErrorPage;