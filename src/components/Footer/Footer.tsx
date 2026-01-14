import React, {Component} from 'react';
import './footer.css';
import logoText from '../../assets/FooterLogo.svg';

interface FooterPropsType {}

class Footer extends Component {
    constructor(props: FooterPropsType) {
        super(props);
    }

    render() {
        return (
            <div className={'footer-container'}>
                <img src={logoText} alt={'2024 sidekick'} />
            </div>
        );
    }
}

export default Footer;