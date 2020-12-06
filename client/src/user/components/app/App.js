import React from "react"
import { Switch, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

//For tree shaking
const FormPage = loadable(() => import('~user/pages/form/Form'))
const HomePage = loadable(() => import('~user/pages/home/Home'))
const Header   = loadable(() => import('~user/components/header/Header'))
const Footer   = loadable(() => import('~user/components/footer/Footer'))

//Import static files
import fontRaleway from '~user/static/fonts/raleway-v18-latin_cyrillic-500.woff2'
import shortIcon   from '~user/static/images/temporary/logo.png'
import "./App.css"

const App = () => {
    const location = useLocation()

    return (
        <>
            <Helmet
                defaultTitle ="гросс маркет"
                titleTemplate="гросс маркет - %s"
            >
                <link rel="preload" href={fontRaleway} as="font" />
                <link rel="shortcut icon" href={shortIcon} />
            </Helmet>

            <div className="page__body">
                <Header theme={location.pathname === '/form' ? 'gray' : 'white'}/>
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/"     component={HomePage} />
                        <Route       path="/form" component={FormPage} />
                    </Switch>
                </AnimatePresence>
                <Footer />
            </div>
        </>
    )
}

export default App

