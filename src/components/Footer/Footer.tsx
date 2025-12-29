import React from 'react';
import './footer.css'
import logoText from '../../assets/Text.svg'

const Footer = () => {
    return (
        <div className={'footer-container'}>
            <img src={logoText} alt={'2024 sidekick'}/>
        </div>
    );
};

export default Footer;