import React, { Component } from "react"

// Import model
import model from "~src/model/model"

// Import static files
import './Header.css'
import Logo       from '~user/components/logo/Logo'
import IconLogout from '~user/static/icons/logout.svg'

export default class Header extends Component {
    model = new model()

    signOut = () => {
        this.model.postSignOut()
            .then(() => {
                return this.props.history.push('/admin/sign')
            })
    }

    render() {
        const { authorization=false } = this.props

        return (
            <header className="header container">
                <Logo />
                {authorization && (
                    <button
                        type="button"
                        className="header__logout"
                        onClick={this.signOut}
                    >
                        Выйти
                        <svg className="header__iconLogout"><use xlinkHref={IconLogout}/></svg>
                    </button>
                )}
            </header>
        )
    }
}
