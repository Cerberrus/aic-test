import React, { Component } from "react"
import { Switch, Route }    from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

//For tree shaking
const FormPage = loadable(() => import('~user/pages/form/form'))
const HomePage = loadable(() => import('~user/pages/home/home'))

//Import static files
import fontRaleway from '~user/static/fonts/raleway-v18-latin_cyrillic-500.woff2'
import "./App.css"

export default class App extends Component {
    render() {
        return (
            <>
                <Helmet
                    defaultTitle ="гросс маркет"
                    titleTemplate="гросс маркет - %s"
                >
                    <link rel="preload" href={fontRaleway} as="font" />
                </Helmet>

                <Switch>
                    <Route exact path="/"     component={HomePage} />
                    <Route       path="/form" component={FormPage} />
                </Switch>
            </>
        )
    }
}


