import React from "react"
import { Link } from "react-router-dom"

// Import styles
import './Logo.css'

//Temporary
import logo from '~user/static/images/temporary/logo.png'

const Logo = () => {
    return (
        <Link to="/" title="Перейти на главную" className="logo">
            <img src={logo} alt="" className="logo__image"/>
            <h1 className="logo__name">гросс маркет</h1>
        </Link>
    )
}

export default Logo

