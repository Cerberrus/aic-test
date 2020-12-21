import React from "react"
import loadable from "@loadable/component"
import { Switch, Route } from "react-router-dom"

// Import components with loadable for tree shaking
const SignPage = loadable(() => import("~admin/pages/sign/Sign"))
const MainPage = loadable(() => import("~admin/pages/main/Main"))

const Routes = () => (
    <Switch>
        <Route exact path="/admin/sign" component={SignPage} />
        <Route       path="/admin"      component={MainPage} />
    </Switch>
)

export default  Routes
