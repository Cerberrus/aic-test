import React from "react"
import { Link } from "react-router-dom"

import Logo from "~user/components/logo/Logo"

// Import styles
import './Header.css'
import iconCross from '~user/static/icons/cross.svg'

const Header = ({ theme='white' }) => {

    const whiteTheme = (
        <div>
            <a href="tel:79264331416" title="Позвонить">+7 (926) 433-14-16</a>
            <Link to="/form" className="header__link button button_yellow">заполнить анкету</Link>
        </div>
    )

    const grayTheme  = (
        <Link to='/'>
            <svg className="header__iconCross"><use xlinkHref={iconCross}/></svg>
        </Link>
    )

    return (
        <header className={theme === 'gray' ? 'header header_theme_gray container' : 'header container'} >
            <Logo />
            {theme === 'gray' ? grayTheme : whiteTheme}
        </header>
    )
}

export default Header

