import React from 'react';
import styles from './notFoundPage.module.css'
import NotFoundIcon from "../../components/icons/NotFoundIcon";
import Head from "next/head";

const NotFoundPage = () => {
    return (
        <>
            <Head>
                <title>404 - Page Not Found | Sidekick Social Network</title>
                <meta name="description" content="The page you are looking for does not exist on Sidekick. Return to the homepage." />
                <meta name="robots" content="noindex, nofollow" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="404 - Page Not Found" />
                <meta property="og:description" content="The page you are looking for does not exist." />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="404 - Page Not Found" />
                <meta name="twitter:description" content="The page you are looking for does not exist." />
            </Head>
            <div className={styles['not-found']}>
            <NotFoundIcon/>
            <div className={styles['not-found__title']}>Page not found</div>
        </div>
        </>
    );
};

export default NotFoundPage;