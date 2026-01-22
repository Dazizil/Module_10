import React from 'react';
import EyeIcon from "../../components/icons/EyeIcon";
import Link from 'next/link';
import styles from './signInPage.module.css'
import PostIcon from "../../components/icons/PostIcon";
import Head from "next/head";

const SignInPage = () => {
    return (
        <>
            <Head>
                <title>Sign In to Sidekick | Social Network</title>
                <meta name="description" content="Sign in to your Sidekick account to access your social network, connect with friends, and share content." />
                <meta name="robots" content="noindex, nofollow" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sign In to Sidekick" />
                <meta property="og:description" content="Sign in to your Sidekick account" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Sign In to Sidekick" />
                <meta name="twitter:description" content="Sign in to your Sidekick account" />
                
                <link rel="canonical" href="https://sidekick.com/signin" />
            </Head>
            <div className={styles['sign-in']}>
            <header>
                <h1 className={styles['sign-in__header']}>Sign in into an account</h1>
                <p className={styles['sign-in__header-text']}>
                    Enter your email and password <br/>
                    to sign in into this app
                </p>
            </header>

            <form className={styles['inputs-container']}>
                <label className={styles['label-container']} htmlFor={'email-input'}>
                    <PostIcon/>
                    <span>Email</span>
                </label>
                <input
                    type={'email'}
                    id={'email-input'}
                    placeholder={'Enter email'}
                    className={styles['sign-in__input']}
                />

                <label className={styles['label-container']} htmlFor={'password-input'}>
                    <EyeIcon/>
                    <span>Password</span>
                </label>
                <input
                    type={'password'}
                    id={'password-input'}
                    placeholder={'Enter password'}
                    className={styles['sign-up__input']}
                />
            </form>

            <button className={styles['sign-in__button']}>Sign In</button>

            <p className={styles['sign-in-option']}>Forget to create an account? <Link href={'/SignUpPage/SignUpPage'}><span
                className={styles['sign-in-link']}>Sign up</span></Link></p>
        </div>
        </>
    );
};

export default SignInPage;