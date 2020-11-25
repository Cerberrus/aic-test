import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <>
                <h1>Header</h1>
                <Link to="/">Главная</Link>
                <br/>
                <Link to="/form">Анкета</Link>
            </>
        )
    }
}


