import React from 'react';
import './signUpPage.css';
import {Link, useNavigate} from 'react-router-dom';
import EyeIcon from '../../components/icons/EyeIcon';
import {useAuth} from '../../context/AuthContext';
import PostIcon from '../../components/icons/PostIcon';
import {useForm} from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const SignUpPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = () => {
        login();
        navigate('/');
    };

    return (
        <div className="sign-up">
            <header>
                <h1 className="sign-up__header">Create an account</h1>
                <p className="sign-up__header-text">
                    Enter your email and password <br />
                    to sign up for this app
                </p>
            </header>

            <form className="inputs-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <label className="label-container" htmlFor="email-input">
                        <PostIcon />
                        <span>Email</span>
                    </label>
                    <input
                        type="email"
                        id="email-input"
                        placeholder="Enter email"
                        className="sign-up__input"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                    />
                </div>

                <div className="input-container">
                    <label className="label-container" htmlFor="password-input">
                        <EyeIcon />
                        <span>Password</span>
                    </label>
                    <input
                        type="password"
                        id="password-input"
                        placeholder="Enter password"
                        className="sign-up__input"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                    />
                </div>

                <button type="submit" className="sign-up__button">Sign Up</button>
            </form>

            <p className="sign-up__terms-of-service">
                By clicking continue, you agree to our{' '}
                <span className="highlighted-text">Terms of Service</span> <br />
                and <span className="highlighted-text">Privacy Policy</span>
            </p>

            <p className="sign-in-option">
                Already have an account?{' '}
                <Link to="/signIn">
                    <span className="sign-in-link">Sign in</span>
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;