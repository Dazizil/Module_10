import React from 'react';
import './notFoundPage.css'
import NotFoundIcon from "../../components/icons/NotFoundIcon";

const NotFoundPage = () => {
    return (
        <div className={'not-found'}>
            <NotFoundIcon/>
            <div className={'not-found__title'}>Page not found</div>
        </div>
    );
};

export default NotFoundPage;