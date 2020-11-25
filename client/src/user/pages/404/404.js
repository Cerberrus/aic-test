import React, { Component } from "react"
import Helmet from "react-helmet"

export default class Error extends Component {
    render() {

        return (
            <main>
                <Helmet>
                    <title>404</title>
                    <meta name="description" content="Services page" />
                </Helmet>

              <h1>404</h1>

            </main>
        )
    }
}

