import React from 'react';
import './profilePage.css'
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../context/ThemeContext";

const ProfilePage = () => {
    const {logout} = useAuth();
    const {toggleTheme} = useTheme()
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/')
    }

    return (
        <main className={'profile'}>
            <section className={'profile__edit'}>
                <h1>Edit profile</h1>
            </section>

            <div className={'profile__content'}>
                <section className={'profile__preferences'}>
                    <h2>Preferences</h2>
                    <button onClick={toggleTheme}>dark theme</button>
                </section>

                <section className={'profile__actions'}>
                    <h2>Actions</h2>
                    <button onClick={handleLogout} className={'logout-button'}>Logout</button>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;