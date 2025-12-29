import React from 'react';
import CrossImage from '../../assets/Vector(6).svg'
import './errorPage.css'

const ErrorPage = () => {
    return (
        <div className={'error'}>
            <img className={'error__image'} src={CrossImage} alt="Error illustration"/>
            <div className={'error__title'}>Oops...<br/>
                Something bad has just happened
            </div>
        </div>
    );
};

export default ErrorPage;