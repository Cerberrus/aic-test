import React from "react"
import { Link } from "react-router-dom"

import Logo from "~user/components/logo/Logo"

// Import styles
import './Header.css'

const Header = () => {
    return (
        <header className="header container">
           <Logo />

            <div>
                <a href="tel:79264331416" title="Позвонить">+7 (926) 433-14-16</a>
                <Link to="/form" className="header__link button button_yellow">заполнить анкету</Link>
            </div>
        </header>
    )
}

export default Header

