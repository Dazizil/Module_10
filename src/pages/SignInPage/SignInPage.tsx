import React from 'react';
import EmailIcon from "../../assets/Vector(7).svg";
import EyeIcon from "../../assets/fi-rr-eye.svg";
import {Link} from "react-router-dom";
import './signInPage.css'
import {useTheme} from "../../context/ThemeContext";
import DarkEmailIcon from "../../assets/DarkPostIcon.svg";
import DarkEyeIcon from "../../assets/DarkEyeIcon.svg";

const SignInPage = () => {
    const {theme} = useTheme();
    return (
        <div className={'sign-in'}>
            <header>
                <h1 className={'sign-in__header'}>Sign in into an account</h1>
                <p className={'sign-in__header-text'}>
                    Enter your email and password <br/>
                    to sign in into this app
                </p>
            </header>

            <form className={'inputs-container'}>
                <label className={'label-container'} htmlFor={'email-input'}>
                    {theme === 'dark'?
                        <img src={EmailIcon} alt={'email'}/>
                        :
                        <img src={DarkEmailIcon} alt={'email'}/>
                    }
                    <span>Email</span>
                </label>
                <input
                    type={'email'}
                    id={'email-input'}
                    placeholder={'Enter email'}
                    className={'sign-in__input'}
                />

                <label className={'label-container'}  htmlFor={'password-input'}>
                    {theme === 'dark'?
                        <img src={EyeIcon} alt={'Opened eye'}/>
                        :
                        <img src={DarkEyeIcon} alt={'Opened eye'}/>
                    }
                    <span>Password</span>
                </label>
                <input
                    type={'password'}
                    id={'password-input'}
                    placeholder={'Enter password'}
                    className={'sign-up__input'}
                />
            </form>

            <button className={'sign-in__button'}>Sign In</button>

            <p className={'sign-in-option'}>Forget to create an account? <Link to={'/signUp'}><span
                className={'sign-in-link'}>Sign up</span></Link></p>
        </div>
    );
};

export default SignInPage;