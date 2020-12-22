import React from "react"
import { Link } from "react-router-dom"

// Import styles
import "./Logo.css"

const Logo = () => (
    <Link to="/" title="Перейти на главную" className="logo">
        <img src={`${process.env.URL_BASE}/static/icons/logo.png`} alt="" className="logo__image"/>
        <h1 className="logo__name">гросс маркет</h1>
    </Link>
)

export default Logo
