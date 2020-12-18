import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import static files
import './Header.css'
import Logo       from '~user/components/logo/Logo'
import IconLogout from '~user/static/icons/logout.svg'

export default class Header extends Component {
    render() {
        const { authorization } = this.props

        return (
            <header className="header container">
                <Logo />
                {authorization && (
                    <Link to='/admin/logout' className="header__logout">
                        Выйти
                        <svg className="header__iconLogout"><use xlinkHref={IconLogout}/></svg>
                    </Link>
                )}
            </header>
        )
    }
}
