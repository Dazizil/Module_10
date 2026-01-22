import React, {useEffect, useState} from 'react';
import './header.css'
import {Link, useLocation} from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";
import SidekickLogo from "../icons/SidekickLogo";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";

interface UserInfoApiResponse {
    firstName: string,
    secondName: string,
    profileImage: string
}

const Header = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfoApiResponse>({firstName: '', secondName: '', profileImage: ''});
    const {logout, isAuthorised} = useAuth();
    const location = useLocation();

    const compactPages = ['/signUp', '/signIn', '/error', '/profile',''];
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
        <header className={`header ${isCompactHeader ? 'header--compact' : ''}`}>

            <div className={'header__logo-container'}>
                <SidekickLogo/>
            </div>

            {isAuthorised && !isCompactHeader ?
                <nav className={'header__links-container'}>
                    <Link to={'/profile'} className={'header__profile-container'}>
                        <img src={userInfo.profileImage} alt={'Profile'} className={'profile-img'}/>
                        <span>{userInfo.firstName} {userInfo.secondName}</span>
                    </Link>
                    <div className={'burger-menu-container'} onClick={handleBurgerMenuClick}>
                        <BurgerMenuIcon/>
                    </div>
                </nav>
                : !isCompactHeader ?
                    <nav className={'header__links-container'}>
                        <Link to={'/signUp'} className={'link'}>
                            Sign Up
                        </Link>
                        <Link to={'/signIn'} className={'link'}>
                            Sign In
                        </Link>
                        <div className={'burger-menu-container'} onClick={handleBurgerMenuClick}>
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