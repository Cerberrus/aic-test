import React from "react"
import {Link} from "react-router-dom";

import Logo from "~user/components/logo/Logo"

// Import Styles
import './footer.css'

// Import static files
import iconFacebook from '~user/static/icons/facebook.svg'
import iconVk       from '~user/static/icons/vk.svg'

import {
    FacebookShareButton,
    VKShareButton,
} from "react-share";


const Footer = () => {
    return (
        <footer className="footer container">
            <div className="footer__share">
                <Logo />
                <p className="footer__shareText">поделиться</p>
                <ul className="footer__social social">
                    <li className="social__item">
                        <VKShareButton url={location.href}>
                            <svg className="social__icon social__icon_vk"><use xlinkHref={iconVk}/></svg>
                        </VKShareButton>
                    </li>
                    <li className="social__item">
                        <FacebookShareButton url={location.href}>
                            <svg className="social__icon social__icon_facebook"><use xlinkHref={iconFacebook}/></svg>
                        </FacebookShareButton>
                    </li>
                </ul>
            </div>
            <div className="footer__powered">
                <p>© Гросс маркет {(new Date()).getFullYear()}</p>
                <button className="footer__policy">Политика обработки персональных данных</button>
            </div>
        </footer>
    )
}

export default Footer