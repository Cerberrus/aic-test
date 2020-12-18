import React, { Component } from "react"
import Helmet from "react-helmet"

export default class Error extends Component {
    render() {
        return (
            <main>
                <Helmet title="404"/>
                <h1>Страница не найдена</h1>
            </main>
        )
    }
}

