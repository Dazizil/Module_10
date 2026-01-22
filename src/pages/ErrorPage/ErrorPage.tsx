import React from 'react';
import styles from './errorPage.module.css'
import ErrorIcon from "../../components/icons/ErrorIcon";
import Head from "next/head";

const ErrorPage = () => {
    return (
        <>
            <Head>
                <title>Error | Sidekick Social Network</title>
                <meta name="description" content="An error occurred on Sidekick. Please try again later." />
                <meta name="robots" content="noindex, nofollow" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Error - Sidekick" />
                <meta property="og:description" content="An error occurred. Please try again later." />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Error - Sidekick" />
                <meta name="twitter:description" content="An error occurred. Please try again later." />
            </Head>
            <div className={styles['error']}>
            <div className={styles['error__image']}>
                <ErrorIcon/>
            </div>
            <div className={styles['error__title']}>Oops...<br/>
                Something bad has just happened
            </div>
        </div>
        </>
    );
};

export default ErrorPage;