import React, {Component} from 'react';
import './footer.css';
import FooterSidekickLogo from "../icons/FooterSidekickLogo";

interface FooterPropsType {}

class Footer extends Component {
    constructor(props: FooterPropsType) {
        super(props);
    }

    render() {
        return (
            <div className={'footer-container'}>
                <FooterSidekickLogo/>
            </div>
        );
    }
}

export default Footer;