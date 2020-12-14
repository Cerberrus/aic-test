import React, { Component } from "react"
import { Switch, Route }    from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

//For tree shaking
const MainPage = loadable(() => import('~admin/pages/main/Main'))
const SignPage = loadable(() => import('~admin/pages/sign/Sign'))
const Header   = loadable(() => import('~user/components/header/Header'))
const Footer   = loadable(() => import('~user/components/footer/Footer'))

// Import static files
import './App.css'
import shortIcon from '~user/static/images/temporary/logo.png'

export default class App extends Component {
    render() {
        return (
            <>
                <Helmet
                    defaultTitle ="гросс маркет"
                    titleTemplate="гросс маркет - %s"
                >
                    <link rel="shortcut icon" href={shortIcon} />
                </Helmet>

                <div className="page__body">
                    <Header theme={'white'}/>
                    <Switch>
                        <Route       path="/admin/sign" component={SignPage} />
                        <Route exact path="/admin"      component={MainPage} />
                        <Route       path="/admin/*"    component={MainPage} />
                    </Switch>
                    <Footer />
                </div>
            </>
        )
    }
}


