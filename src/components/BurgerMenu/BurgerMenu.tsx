// BurgerMenu.tsx
import React from 'react';
import './burgerMenu.css';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({isOpen, onClose}) => {
    const {isAuthenticated} = useAuth()
    if (!isOpen) return null;

    return (
        <div className="burger-menu-overlay" onClick={onClose}>
            {isAuthenticated ?
                <div className="burger-menu" onClick={(e) => e.stopPropagation()}>
                    <nav className="burger-menu__nav">
                        <Link to={'/profile'} className={'burger__link'} onClick={onClose}>Profile info</Link>
                        <Link to={'/statistic'} className={'burger__link'} onClick={onClose}>Statistic</Link>
                    </nav>
                </div>
            :
                <div className="burger-menu" onClick={(e) => e.stopPropagation()}>
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