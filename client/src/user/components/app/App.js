import React, { Component } from "react"
import { Switch, Route }    from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

import Header from "~user/components/header/header"
import Footer from "~user/components/footer/footer"

const HomePage = loadable(() => import('~user/pages/home/home'))
const FormPage = loadable(() => import('~user/pages/form/form'))

import "../../static/styles/global.css"

export default class App extends Component {
    render() {
        return (
            <>
                <Helmet>
                    defaultTitle="гросс маркет"
                    titleTemplate="гросс маркет - %s"

                    <link rel="preload" href="~user/static/fonts/raleway-v18-latin_cyrillic-500.woff2" as="font" />
                </Helmet>

                <Header />
                <Switch>
                    <Route exact path="/"     component={HomePage} />
                    <Route       path="/form" component={FormPage} />
                </Switch>
                <Footer />
            </>
        )
    }
}


