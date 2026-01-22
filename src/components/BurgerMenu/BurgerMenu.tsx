import React from 'react';
import styles from './burgerMenu.module.css';
import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";

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
        <div className={styles['burger-menu-overlay']} onClick={onClose}>
            {isAuthorised ?
                <div className={styles['burger-menu']} onClick={handleBurgerMenuClick}>
                    <nav className={styles['burger-menu__nav']}>
                        <Link href={'/profile'} className={styles['burger__link']} onClick={onClose}>Profile info</Link>
                        <Link href={'/statistic'} className={styles['burger__link']} onClick={onClose}>Statistic</Link>
                    </nav>
                </div>
                :
                <div className={styles['burger-menu']} onClick={handleBurgerMenuClick}>
                    <nav className={styles['burger-menu__nav']}>
                        <Link href={'/signUp'} className={styles['burger__link']} onClick={onClose}>Sign up</Link>
                        <Link href={'/signIn'} className={styles['burger__link']} onClick={onClose}>Sign in</Link>
                    </nav>
                </div>
            }
        </div>
    );
};

export default BurgerMenu;