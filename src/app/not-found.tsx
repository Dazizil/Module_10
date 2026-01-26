'use client'
import React from 'react';
import styles from './notFoundPage.module.css'
import NotFoundIcon from "@/app/components/icons/NotFoundIcon";

const NotFoundPage = () => {
    return (
        <>
            <div className={styles['not-found']}>
                <NotFoundIcon/>
                <div className={styles['not-found__title']}>Page not found</div>
            </div>
        </>
    );
};

export default NotFoundPage;