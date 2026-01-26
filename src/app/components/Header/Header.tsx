'use client'
import React, {useEffect, useState} from 'react';
import styles from './header.module.css'
import Link from 'next/link';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import axios from "axios";
import {useAuth} from "@/app/context/AuthContext";
import SidekickLogo from "../icons/SidekickLogo";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";
import {usePathname} from "next/navigation";

interface UserInfoApiResponse {
    firstName: string,
    secondName: string,
    profileImage: string
}

const Header = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfoApiResponse>({firstName: '', secondName: '', profileImage: ''});
    const {logout, isAuthorised} = useAuth();
    const location = usePathname();

    const compactPages = ['/Page', '/Page', '/error', '/profile', ''];
    const isCompactHeader = compactPages.includes(location);

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
            <div className={styles['header__content-container']}>
                <div className={styles['header__logo-container']}>
                    <SidekickLogo/>
                </div>

                {isAuthorised && !isCompactHeader ?
                    <nav className={styles['header__links-container']}>
                        <Link href={'/ProfilePage'} className={styles['header__profile-container']}>
                            <img src={userInfo.profileImage ? userInfo.profileImage : 'assets/user-helena.png'} alt={'Profile'} className={styles['profile-img']}/>
                            <span>{userInfo.firstName} {userInfo.secondName}</span>
                        </Link>
                        <div className={styles['burger-menu-container']} onClick={handleBurgerMenuClick}>
                            <BurgerMenuIcon/>
                        </div>
                    </nav>
                    : !isCompactHeader ?
                        <nav className={styles['header__links-container']}>
                            <Link href={'/SignUpPage'} className={styles['link']}>
                                Sign Up
                            </Link>
                            <Link href={'/SignInPage'} className={styles['link']}>
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
            </div>
        </header>
    );
};

export default Header;