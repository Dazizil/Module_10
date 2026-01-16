import React, {useState} from 'react';
import './header.css'
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import ProfilePicture from '../../assets/SomeWomen.jpg'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";
import SidekickLogo from "../icons/SidekickLogo";

const Header = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    const compactPages = ['/signUp', '/signIn', '/error', ''];
    const isCompactHeader = compactPages.includes(location.pathname);

    function handleClose() {
        setIsBurgerOpen(false);
    }

    function handleBurgerMenuClick() {
        setIsBurgerOpen(true);
    }

    return (
        <header className={`header ${isCompactHeader ? 'header--compact' : ''}`}>

            <div className={'header__logo-container'}>
                <SidekickLogo/>
            </div>

            {isAuthenticated && !isCompactHeader ?
                <nav className={'header__links-container'}>
                    <Link to={'/profile'} className={'header__profile-container'}>
                        <img src={ProfilePicture} alt={'Profile'} className={'profile-img'}/>
                        <span>Name Surname</span>
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