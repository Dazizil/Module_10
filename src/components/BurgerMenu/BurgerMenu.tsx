import React from 'react';
import './burgerMenu.css';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const BurgerMenu = ({isOpen, onClose}: BurgerMenuProps) => {
    const {isAuthorised} = useAuth();
    if (!isOpen) return null;

    function handleBurgerMenuClick(event: React.MouseEvent) {
        event.stopPropagation()
    }

    return (
        <div className="burger-menu-overlay" onClick={onClose}>
            {isAuthorised ?
                <div className="burger-menu" onClick={handleBurgerMenuClick}>
                    <nav className="burger-menu__nav">
                        <Link to={'/profile'} className={'burger__link'} onClick={onClose}>Profile info</Link>
                        <Link to={'/statistic'} className={'burger__link'} onClick={onClose}>Statistic</Link>
                    </nav>
                </div>
                :
                <div className="burger-menu" onClick={handleBurgerMenuClick}>
                    <nav className="burger-menu__nav">
                        <Link to={'/signUp'} className={'burger__link'} onClick={onClose}>Sign up</Link>
                        <Link to={'/signIn'} className={'burger__link'} onClick={onClose}>Sign in</Link>
                    </nav>
                </div>
            }
        </div>
    );
};

export default BurgerMenu;