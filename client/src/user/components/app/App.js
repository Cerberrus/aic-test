import React, { Component } from "react"
import { Switch, Route }    from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

import Header from "~user/components/header/header"
import Footer from "~user/components/footer/footer"

//For tree shaking
import HomePage from '~user/pages/home/home'
const FormPage = loadable(() => import('~user/pages/form/form'))

//Import static files
import "../../static/styles/global.css"
import fontRaleway from '~user/static/fonts/raleway-v18-latin_cyrillic-500.woff2'

export default class App extends Component {
    render() {
        return (
            <div className="page__body">
                <Helmet
                    defaultTitle ="гросс маркет"
                    titleTemplate="гросс маркет - %s"
                >
                    <link rel="preload" href={fontRaleway} as="font" />
                </Helmet>

                <Header />
                <Switch>
                    <Route exact path="/"     component={HomePage} />
                    <Route       path="/form" component={FormPage} />
                </Switch>
                <Footer />
            </div>
        )
    }
}


