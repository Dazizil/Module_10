'use client'
import React from 'react';
import EyeIcon from "@/app/components/icons/EyeIcon";
import Link from 'next/link';
import styles from './signInPage.module.css'
import PostIcon from "@/app/components/icons/PostIcon";

const Page = () => {
    return (
        <>
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
                    className={styles['sign-in__input']}
                />
            </form>

            <button className={styles['sign-in__button']}>Sign In</button>

            <p className={styles['sign-in-option']}>Forget to create an account? <Link href={'/src/app/(auth)/SignUpPage/Page'}><span
                className={styles['sign-in-link']}>Sign up</span></Link></p>
        </div>
        </>
    );
};

export default Page;