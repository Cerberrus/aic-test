import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import model
import model from "~src/model/model"

// Import static files
import "./Header.css"
import iconCross from "~src/static/icons/cross.svg"
import iconPhone from "~src/static/icons/phone.svg"
import Logo      from "~user/components/logo/Logo"

export default class Header extends Component {
    model = new model()

    state = {
        linkSticky: false,
        phone:         "",
    }

    componentDidMount() {
        this.model.getInformation()
            .then(response => {
                this.setState({
                    phone: response.phone
                })
            })

        window.scrollTo(0, 0)
        window.addEventListener("scroll", this.onScroll)
    }

    onScroll = () => {
        const linkSticky = window.scrollY > 100
        this.setState({linkSticky})
    }

    render() {
        const { linkSticky, phone } = this.state
        const { theme } = this.props

        const whiteTheme = (
            <div>
                <a href={`tel:${phone}`} title="Позвонить">
                    <span className="header__phone">+{phone}</span>
                    <svg  className="header__iconPhone"><use xlinkHref={iconPhone}/></svg>
                </a>
                <Link
                    to="/form"
                    className={`header__link button button_yellow ${linkSticky && " header__link_fixed"}`}
                >
                    заполнить анкету
                </Link>
            </div>
        )

        const grayTheme  = (
            <Link to="/" title="Перейти на главную">
                <svg className="header__iconCross"><use xlinkHref={iconCross}/></svg>
            </Link>
        )

        return (
            <header className={`header container ${theme === "gray" && " header_theme_gray"}`}>
                <Logo />
                {theme === "gray" ? grayTheme : whiteTheme}
            </header>
        )
    }
}
