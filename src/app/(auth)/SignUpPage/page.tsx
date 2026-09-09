'use client'
import React from 'react';
import styles from './signUpPage.module.css';
import Link from 'next/link';
import EyeIcon from '@/app/components/icons/EyeIcon';
import {useAuth} from '@/app/context/AuthContext';
import PostIcon from '@/app/components/icons/PostIcon';
import {useForm} from 'react-hook-form';
import {useRouter} from "next/navigation";
import {useNotification} from "@/app/context/NotificationContext";

interface FormData {
    email: string;
    password: string;
}

const Page = () => {
    const {login} = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>();
    const {showNotification} = useNotification()

    function onSubmit() {
        login().then(r => console.log('res: ', r));
        router.push('/');
    }

    function onError(errors: any) {
        const firstError = Object.values(errors)[0] as any;
        if (firstError?.message) {
            showNotification(firstError.message);
        }
    }

    return (
        <>
            <div className={styles['sign-up']}>
                <header>
                    <h1 className={styles['sign-up__header']}>Create an account</h1>
                    <p className={styles['sign-up__header-text']}>
                        Enter your email and password <br/>
                        to sign up for this app
                    </p>
                </header>

                <form className={styles['inputs-container']} onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className={styles['input-container']}>
                        <label className={styles['label-container']} htmlFor="email-input">
                            <PostIcon/>
                            <span>Email</span>
                        </label>
                        <input
                            type="text"
                            id="email-input"
                            placeholder="Enter email"
                            className={styles['sign-up__input']}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email'
                                }
                            })}
                        />
                    </div>

                    <div className={styles['input-container']}>
                        <label className={styles['label-container']} htmlFor="password-input">
                            <EyeIcon/>
                            <span>Password</span>
                        </label>
                        <input
                            type="password"
                            id="password-input"
                            placeholder="Enter password"
                            className={styles['sign-up__input']}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                    </div>

                    <button type="submit" className={styles['sign-up__button']}>Sign Up</button>
                </form>

                <p className={styles['sign-up__terms-of-service']}>
                    By clicking continue, you agree to our{' '}
                    <span className={styles['highlighted-text']}>Terms of Service</span> <br/>
                    and <span className={styles['highlighted-text']}>Privacy Policy</span>
                </p>

                <p className={styles['sign-in-option']}>
                    Already have an account?{' '}
                    <Link href="/SignInPage">
                        <span className={styles['sign-in-link']}>Sign in</span>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Page;