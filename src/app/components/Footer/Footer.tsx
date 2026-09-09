'use client'
import React, {Component} from 'react';
import styles from './footer.module.css';
import FooterSidekickLogo from "../icons/FooterSidekickLogo";

interface FooterPropsType {}

class Footer extends Component {
    constructor(props: FooterPropsType) {
        super(props);
    }

    render() {
        return (
            <div className={styles['footer-container']} data-testid={'footer-container'}>
                <FooterSidekickLogo/>
            </div>
        );
    }
}

export default Footer;