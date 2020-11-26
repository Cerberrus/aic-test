import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import styles
import '../../static/styles/global.css'
import './header.css'

//Temporary
import logo from '~user/static/images/temporary/logo.jpg'

export default class Header extends Component {
    render() {
        return (
            <header styleName="header container">
                <Link to="/" title="Перейти на главную" styleName="header__logoWrapper">
                    <img src={logo} alt="" styleName="header__logo"/>
                    <h1 styleName="header__name">гросс маркет</h1>
                </Link>

                <div>
                    <a href="tel:79264331416" title="Позвонить">+7 (926) 433-14-16</a>
                    <Link to="/form" styleName="header__link button button_yellow">заполнить анкету</Link>
                </div>
            </header>
        )
    }
}


