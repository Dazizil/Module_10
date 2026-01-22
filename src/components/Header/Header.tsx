import React, {useEffect, useState} from 'react';
import styles from './header.module.css'
import Link from 'next/link';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import axios from "axios";
import {useAuth} from "@/context/AuthContext";
import SidekickLogo from "../icons/SidekickLogo";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";
import {useRouter} from "next/router";

interface UserInfoApiResponse {
    firstName: string,
    secondName: string,
    profileImage: string
}

const Header = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfoApiResponse>({firstName: '', secondName: '', profileImage: ''});
    const {logout, isAuthorised} = useAuth();
    const location = useRouter();

    const compactPages = ['/SignUpPage', '/SignUpPage', '/error', '/profile',''];
    const isCompactHeader = compactPages.includes(location.pathname);

    function handleClose() {
        setIsBurgerOpen(false);
    }

    function handleBurgerMenuClick() {
        setIsBurgerOpen(true);
    }

    useEffect(() => {
        async function getMe() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/me', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                });
                setUserInfo(response.data);
            } catch (error: any) {
                if (error.response?.status === 401) {
                    logout();
                }
            }
        }

        getMe();
    }, []);

    return (
        <header className={`${styles['header']} ${isCompactHeader ? styles['header--compact'] : ''}`}>

            <div className={styles['header__logo-container']}>
                <SidekickLogo/>
            </div>

            {isAuthorised && !isCompactHeader ?
                <nav className={styles['header__links-container']}>
                    <Link href={'/ProfilePage/ProfilePage'} className={styles['header__profile-container']}>
                        <img src={userInfo.profileImage} alt={'Profile'} className={styles['profile-img']}/>
                        <span>{userInfo.firstName} {userInfo.secondName}</span>
                    </Link>
                    <div className={styles['burger-menu-container']} onClick={handleBurgerMenuClick}>
                        <BurgerMenuIcon/>
                    </div>
                </nav>
                : !isCompactHeader ?
                    <nav className={styles['header__links-container']}>
                        <Link href={'/SignUpPage/SignUpPage'} className={styles['link']}>
                            Sign Up
                        </Link>
                        <Link href={'/SignInPage/SignInPage'} className={styles['link']}>
                            Sign In
                        </Link>
                        <div className={styles['burger-menu-container']} onClick={handleBurgerMenuClick}>
                            <BurgerMenuIcon/>
                        </div>
                    </nav>
                    :
                    <></>
            }

            <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={handleClose}
            />
        </header>
    );
};

export default Header;