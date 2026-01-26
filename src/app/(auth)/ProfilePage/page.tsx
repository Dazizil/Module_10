'use client'
import React, {FormEvent, useState} from 'react';
import styles from './profilePage.module.css'
import signUpStyles from '@/app/(auth)/SignUpPage/signUpPage.module.css'
import {useAuth} from "@/app/context/AuthContext";
import {useTheme} from "@/app/context/ThemeContext";
import PostIcon from "@/app/components/icons/PostIcon";
import PencilIcon from "@/app/components/icons/PencilIcon";
import UserIcon from "@/app/components/icons/UserIcon";
import InfoIcon from "@/app/components/icons/InfoIcon";
import Switcher from "@/app/components/Switcher/Switcher";
import StatTableBlock from "@/app/components/StateTableBlock/StatTableBlock";
import MetricSection from "@/app/components/MetricSection/MetricSection";
import {useRouter} from "next/navigation";
import {useNotification} from "@/app/context/NotificationContext";

const Page = () => {
    const [activeTab, setActiveTab] = useState('info');
    const {user, logout} = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [description, setDescription] = useState(user?.description || '');
    const {theme, toggleTheme} = useTheme()
    const router = useRouter();
    const {showNotification} = useNotification();

    function handleLogout() {
        logout();
        showNotification('Logged out successfully');
        router.push('/')
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        showNotification('Changes applied successfully');
    }

    console.log('Юзер: ', user)

    return (
        <main className={styles['profile']}>

            <nav className={styles['profile__navigation']}>
                <div
                    className={activeTab === 'info' ? styles['active'] : styles['profile__navigation-button']}
                    onClick={() => setActiveTab('info')} data-testid={'profile-info-button'}>Profile
                    info
                </div>
                <div className={activeTab === 'stats' ? styles['active'] : styles['profile__navigation-button']}
                     onClick={() => setActiveTab('stats')} data-testid={'statistic-button'}>Statistic
                </div>
            </nav>

            {activeTab === 'info' ?
                <>
                    <div className={styles['profile__main-container']}>

                        <form className={styles['profile__edit']} onSubmit={handleSubmit}>
                            <h1>Edit profile</h1>

                            <div className={styles['profile__photo-container']}>
                                <div className={styles['profile__profile-image-container']}>
                                    <img className={styles['profile__profile-image']} src={user?.profileImage}/>
                                </div>

                                <div className={styles['profile__photo-username-container']}>
                                    <div>
                                        <span>{user?.firstName} </span>
                                        <span>{user?.secondName}</span>
                                    </div>
                                    <div className={styles['profile__change-photo-text']}>Change profile photo</div>
                                </div>
                            </div>


                            <div className={signUpStyles['input-container']}>
                                <label className={signUpStyles['label-container']} htmlFor="email-input">
                                    <UserIcon/>
                                    <span>Username</span>
                                </label>

                                <input
                                    type="text"
                                    id="email-input"
                                    value={username}
                                    className={signUpStyles['sign-up__input']}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className={signUpStyles['input-container']}>
                                <label className={signUpStyles['label-container']} htmlFor="email-input">
                                    <PostIcon/>
                                    <span>Email</span>
                                </label>

                                <input
                                    type="email"
                                    id="email-input"
                                    value={email}
                                    className={signUpStyles['sign-up__input']}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div className={signUpStyles['input-container']}>
                                <label className={signUpStyles['label-container']} htmlFor="email-input">
                                    <PencilIcon/>
                                    <span>Description</span>
                                </label>

                                <textarea
                                    className={styles['profile__description-textarea']}
                                    value={description}
                                    maxLength={200}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />

                                <div className={styles['profile__info-container']}>
                                    <InfoIcon/>
                                    <span className={styles['profile__info-text']}>Max 200 chars</span>
                                </div>
                            </div>

                            <button className={styles['profile__save-changes-button']} type={'submit'}>Save Profile Changes</button>
                        </form>


                        <div className={styles['profile__content']}>
                            <section className={styles['profile__preferences']}>
                                <h2>Preferences</h2>
                                <div className={styles['profile__theme-switch-container']}>
                            <span onClick={toggleTheme}>
                                <Switcher/>
                            </span>
                                    <span>{theme} theme</span>
                                </div>
                            </section>

                            <section className={styles['profile__actions']}>
                                <h2>Actions</h2>
                                <button onClick={handleLogout} className={styles['logout-button']}>Logout</button>
                            </section>

                        </div>
                    </div>
                </>
                :
                <>
                    <MetricSection/>
                    <div className={styles['profile__table-view-container']} data-testid={'view-switcher'}>
                        <span>Table view</span>
                        <Switcher/>
                        <span>Chart view</span>
                    </div>
                    <StatTableBlock/>
                </>
            }
        </main>
    );
};

export default Page;