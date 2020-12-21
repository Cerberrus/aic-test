import React from "react"
import {Switch, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import loadable from "@loadable/component"

// Import components with loadable for tree shaking
const HomePage    = loadable(() => import("~user/pages/home/Home"))
const VacancyPage = loadable(() => import("~user/pages/vacancy/Vacancy"))

const Routes = () => {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.key}>
                <Route exact path="/"     component={HomePage} />
                <Route       path="/form" component={VacancyPage} />
            </Switch>
        </AnimatePresence>
    )
}

export default Routes
