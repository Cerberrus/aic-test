import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import static files
import './Header.css'
import iconCross from '~user/static/icons/cross.svg'
import iconPhone from '~user/static/icons/phone.svg'
import Logo      from '~user/components/logo/Logo'

export default class Header extends Component {
    state = {
        linkSticky: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        const linkSticky = window.scrollY > 100
        this.setState({linkSticky})
    }

    render() {
        const { linkSticky } = this.state
        const { theme } = this.props

        const whiteTheme = (
            <div>
                <a href="tel:79264331416" title="Позвонить">
                    <span className="header__phone">+7 (926) 433-14-16</span>
                    <svg  className="header__iconPhone"><use xlinkHref={iconPhone}/></svg>
                </a>
                <Link to="/form" className={linkSticky ? "header__link header__link_fixed button button_yellow" : "header__link button button_yellow"}>заполнить анкету</Link>
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
}
