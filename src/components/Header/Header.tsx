import React, {useState} from 'react';
import './header.css'
import DarkLogo from '../../assets/logo.svg'
import LightLogo from '../../assets/logo(1).svg'
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import ProfilePicture from '../../assets/956a3801a7d333c73be572f106a7f948da04390d.jpg'
import BurgerMenuIcon from '../../assets/fi-rr-menu-burger.svg'
import DarkBurgerMenu from '../../assets/DarkBurgerMenu.svg'
import {useTheme} from "../../context/ThemeContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {isAuthenticated} = useAuth();
    const {theme} = useTheme();
    const location = useLocation();

    // Страницы с компактным хедером
    const compactPages = ['/signUp', '/signIn', '/error', ''];
    const isCompactHeader = compactPages.includes(location.pathname)

    return (
        <header className={`header ${isCompactHeader ? 'header--compact' : ''}`}>

            <div className={'header__logo-container'}>
                {theme === 'dark' ?
                    <img className={'logo'} src={DarkLogo} alt={'Sidekick logo'}/>
                    :
                    <img className={'logo'} src={LightLogo} alt={'Sidekick logo'}/>
                }
            </div>

            {isAuthenticated && !isCompactHeader ?
                <nav className={'header__links-container'}>
                    <Link to={'/profile'} className={'header__profile-container'}>
                        <img src={ProfilePicture} alt={'Profile'} className={'profile-img'}/>
                        <span>Name Surname</span>
                    </Link>
                    <div className={'burger-menu-container'}>
                        <img src={theme === 'dark' ? BurgerMenuIcon : DarkBurgerMenu}
                             onClick={() => setIsBurgerOpen(true)}/>
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
                        <div className={'burger-menu-container'}>
                            <img src={theme === 'dark' ? BurgerMenuIcon : DarkBurgerMenu}
                                 onClick={() => setIsBurgerOpen(true)}/>
                        </div>
                    </nav>
                    :
                    <></>
            }

            <BurgerMenu
                isOpen={isBurgerOpen}
                onClose={() => setIsBurgerOpen(false)}
            />
        </header>
    );
};

export default Header;