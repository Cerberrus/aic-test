import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import styles
import './header.css'

//Temporary
import logo from '~user/static/images/temporary/logo.jpg'

export default class Header extends Component {
    render() {
        return (
            <header className="header container">
                <Link to="/" title="Перейти на главную" className="header__logoWrapper">
                    <img src={logo} alt="" className="header__logo"/>
                    <h1 className="header__name">гросс маркет</h1>
                </Link>

                <div>
                    <a href="tel:79264331416" title="Позвонить">+7 (926) 433-14-16</a>
                    <Link to="/form" className="header__link button button_yellow">заполнить анкету</Link>
                </div>
            </header>
        )
    }
}


