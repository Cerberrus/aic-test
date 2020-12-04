import React, { Component } from "react"
import { Switch, Route }    from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

//For tree shaking
const SignPage = loadable(() => import('~admin/pages/sign/sign'))

// Import static files
import './App.css'

export default class App extends Component {
    render() {
        return (
            <>
                <Helmet
                    title="Панель управления"
                />
                <h1>Панель управления</h1>
                <Switch>
                    <Route  path="/admin/sign"     component={SignPage} />
                </Switch>
            </>
        )
    }
}


