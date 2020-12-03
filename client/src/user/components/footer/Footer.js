import React from "react"
import { FacebookShareButton, VKShareButton} from "react-share"
import { useLocation } from "react-router-dom"

// Import static files
import './Footer.css'
import Logo         from "~user/components/logo/Logo"
import iconVk       from '~user/static/icons/vk.svg'
import iconFacebook from '~user/static/icons/facebook.svg'

const Footer = () => (
    <footer className="footer container">
        <div className="footer__share">
            <Logo />
            <p className="footer__shareText">поделиться</p>
            <ul className="footer__social social">
                <li className="social__item">
                    <VKShareButton url={useLocation().path}>
                        <svg className="social__icon social__icon_vk"><use xlinkHref={iconVk}/></svg>
                    </VKShareButton>
                </li>
                <li className="social__item">
                    <FacebookShareButton url={useLocation().path}>
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

export default Footer
