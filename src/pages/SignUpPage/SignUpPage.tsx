import React, {ChangeEvent, useState} from 'react';
import './signUpPage.css'
import {Link, useNavigate} from "react-router-dom";
import EyeIcon from '../../components/icons/EyeIcon'
import {useAuth} from "../../context/AuthContext";
import {useTheme} from "../../context/ThemeContext";
import PostIcon from "../../components/icons/PostIcon";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const {theme} = useTheme();

    function handleRegister() {
        login();
        navigate('/');
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    return (
        <div className={'sign-up'}>
            <header>
                <h1 className={'sign-up__header'}>Create an account</h1>
                <p className={'sign-up__header-text'}>
                    Enter your email and password <br/>
                    to sign up for this app
                </p>
            </header>

            <form className={'inputs-container'}>
                <div className={'input-container'}>
                    <label className={'label-container'} htmlFor={'email-input'}>
                        <PostIcon/>
                        <span>Email</span>
                    </label>
                    <input
                        type={'email'}
                        id={'email-input'}
                        placeholder={'Enter email'}
                        className={'sign-up__input'}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={'input-container'}>
                    <label className={'label-container'} htmlFor={'password-input'}>
                        <EyeIcon/>
                        <span>Password</span>
                    </label>
                    <input
                        type={'password'}
                        id={'password-input'}
                        placeholder={'Enter password'}
                        className={'sign-up__input'}
                        onChange={handleInputChange}
                    />
                </div>
            </form>

            <button onClick={handleRegister} className={'sign-up__button'}>Sign Up</button>

            <p className={'sign-up__terms-of-service'}>By clicking continue, you agree to our <span
                className={'highlighted-text'}>Terms of Service</span> <br/> and <span className={'highlighted-text'}>Privacy Policy</span>
            </p>

            <p className={'sign-in-option'}>Already have an account? <Link to={'/signIn'}><span
                className={'sign-in-link'}>Sign in</span></Link></p>
        </div>
    );
};

export default SignUpPage;