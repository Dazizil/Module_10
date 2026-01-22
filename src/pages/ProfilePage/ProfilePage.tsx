import React, {FormEvent, useState} from 'react';
import './profilePage.css'
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../context/ThemeContext";
import PostIcon from "../../components/icons/PostIcon";
import PencilIcon from "../../components/icons/PencilIcon";
import UserIcon from "../../components/icons/UserIcon";
import InfoIcon from "../../components/icons/InfoIcon";
import Switcher from "../../components/Switcher/Switcher";
import StatTableBlock from "../../components/StateTableBlock/StatTableBlock";
import MetricSection from "../../components/MetricSection/MetricSection";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('info');
    const {user, logout} = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [description, setDescription] = useState(user?.description || '');
    const {theme, toggleTheme} = useTheme()
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/')
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    console.log('Юзер: ', user)

    return (
        <main className={'profile'}>

            <nav className={'profile__navigation'}>
                <div
                    className={activeTab === 'info' ? 'active' : 'profile__navigation-button'}
                    onClick={() => setActiveTab('info')} data-testid={'profile-info-button'}>Profile
                    info
                </div>
                <div className={activeTab === 'stats' ? 'active' : 'profile__navigation-button'}
                     onClick={() => setActiveTab('stats')} data-testid={'statistic-button'}>Statistic
                </div>
            </nav>

            {activeTab === 'info' ?
                <>
                    <div className={'profile__main-container'}>

                        <form className={'profile__edit'} onSubmit={handleSubmit}>
                            <h1>Edit profile</h1>

                            <div className={'profile__photo-container'}>
                                <div className={'profile__profile-image-container'}>
                                    <img className={'profile__profile-image'} src={user?.profileImage}/>
                                </div>

                                <div className={'profile__photo-username-container'}>
                                    <div>
                                        <span>{user?.firstName} </span>
                                        <span>{user?.secondName}</span>
                                    </div>
                                    <div className={'profile__change-photo-text'}>Change profile photo</div>
                                </div>
                            </div>


                            <div className="input-container">
                                <label className="label-container" htmlFor="email-input">
                                    <UserIcon/>
                                    <span>Username</span>
                                </label>

                                <input
                                    type="text"
                                    id="email-input"
                                    value={username}
                                    className="sign-up__input"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="input-container">
                                <label className="label-container" htmlFor="email-input">
                                    <PostIcon/>
                                    <span>Email</span>
                                </label>

                                <input
                                    type="email"
                                    id="email-input"
                                    value={email}
                                    className="sign-up__input"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div className="input-container">
                                <label className="label-container" htmlFor="email-input">
                                    <PencilIcon/>
                                    <span>Description</span>
                                </label>

                                <textarea
                                    className={'profile__description-textarea'}
                                    value={description}
                                    maxLength={200}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />

                                <div className={'profile__info-container'}>
                                    <InfoIcon/>
                                    <span className={'profile__info-text'}>Max 200 chars</span>
                                </div>
                            </div>

                            <button className={'profile__save-changes-button'} type={'submit'}>Save Profile Changes</button>
                        </form>


                        <div className={'profile__content'}>
                            <section className={'profile__preferences'}>
                                <h2>Preferences</h2>
                                <div className={'profile__theme-switch-container'}>
                            <span onClick={toggleTheme}>
                                <Switcher/>
                            </span>
                                    <span>{theme} theme</span>
                                </div>
                            </section>

                            <section className={'profile__actions'}>
                                <h2>Actions</h2>
                                <button onClick={handleLogout} className={'logout-button'}>Logout</button>
                            </section>

                        </div>
                    </div>
                </>
                :
                <>
                    <MetricSection/>
                    <div className={'profile__table-view-container'} data-testid={'view-switcher'}>
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

export default ProfilePage;