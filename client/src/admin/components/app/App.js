import React, { Component } from "react"
import {Switch, Route } from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

// Import components with loadable for tree shaking
const MainPage = loadable(() => import('~admin/pages/main/Main'))
const SignPage = loadable(() => import('~admin/pages/sign/Sign'))

// Import static files
import appleIcon  from '~user/static/images/favicon180x180.png'
import favIcon    from '~user/static/images/favicon32x32.png'

export default class App extends Component {
    render() {
        return (
            <>
                <Helmet
                    defaultTitle ="гросс маркет"
                    titleTemplate="гросс маркет - %s"
                >
                    <meta name="viewport" content="width=1110"/>
                    <link rel="apple-touch-icon" sizes="180x180"    href={appleIcon} />
                    <link rel="icon" type="image/png" sizes="32x32" href={favIcon} />
                </Helmet>

                <Switch>
                    <Route exact path="/admin/sign" component={SignPage} />
                    <Route exact path="/admin"      component={MainPage} />
                    <Route       path="/admin/*"    component={MainPage} />
                </Switch>
            </>
        )
    }
}


