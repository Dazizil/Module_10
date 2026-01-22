import React, {useState} from 'react';
import styles from './signUpPage.module.css';
import Link from 'next/link';
import EyeIcon from '../../components/icons/EyeIcon';
import {useAuth} from '@/context/AuthContext';
import PostIcon from '../../components/icons/PostIcon';
import {useForm} from 'react-hook-form';
import PopUpNotification from "../../components/PopUpNotification/PopUpNotification";
import {useRouter} from "next/router";
import Head from "next/head";

interface FormData {
    email: string;
    password: string;
}

const SignUpPage = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    function showNotification (message: string) {
        setNotification({isVisible: true, message});
    }

    function hideNotification () {
        setNotification(prev => ({...prev, isVisible: false}));
    }

    function onSubmit () {
        login().then(r => console.log('res: ', r));
        router.push('/');
    }

    function onError (errors: any) {
        const firstError = Object.values(errors)[0] as any;
        if (firstError?.message) {
            showNotification(firstError.message);
        }
    }

    return (
        <>
            <Head>
                <title>Create Account | Sign Up for Sidekick Social Network</title>
                <meta name="description" content="Join Sidekick social network today! Create your free account to connect with friends, share posts, join communities, and discover new content." />
                <meta name="keywords" content="sign up, register, create account, social network, join, sidekick, social media" />
                <meta name="robots" content="noindex, nofollow" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sign Up for Sidekick Social Network" />
                <meta property="og:description" content="Create your free account and join the Sidekick community today!" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Sign Up for Sidekick" />
                <meta name="twitter:description" content="Create your free account and join the Sidekick community" />
                
                <link rel="canonical" href="https://sidekick.com/signup" />
            </Head>
            <div className={styles['sign-up']}>
            <header>
                <h1 className={styles['sign-up__header']}>Create an account</h1>
                <p className={styles['sign-up__header-text']}>
                    Enter your email and password <br />
                    to sign up for this app
                </p>
            </header>

            <form className={styles['inputs-container']} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={styles['input-container']}>
                    <label className={styles['label-container']} htmlFor="email-input">
                        <PostIcon />
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
                        <EyeIcon />
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
                <span className={styles['highlighted-text']}>Terms of Service</span> <br />
                and <span className={styles['highlighted-text']}>Privacy Policy</span>
            </p>

            <p className={styles['sign-in-option']}>
                Already have an account?{' '}
                <Link href="/SignInPage/SignInPage">
                    <span className={styles['sign-in-link']}>Sign in</span>
                </Link>
            </p>
            <PopUpNotification
                isVisible={notification.isVisible}
                message={notification.message}
                onClose={hideNotification}
            />
        </div>
        </>
    );
};

export default SignUpPage;