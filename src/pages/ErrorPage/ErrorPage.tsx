import React from 'react';
import './errorPage.css'
import ErrorIcon from "../../components/icons/ErrorIcon";

const ErrorPage = () => {
    return (
        <div className={'error'}>
            <div className={'error__image'}>
                <ErrorIcon/>
            </div>
            <div className={'error__title'}>Oops...<br/>
                Something bad has just happened
            </div>
        </div>
    );
};

export default ErrorPage;