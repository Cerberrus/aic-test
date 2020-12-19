import React from "react"
import {Switch, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

// For tree shaking
const VacancyPage = loadable(() => import('~user/pages/vacancy/Vacancy'))
const HomePage = loadable(() => import('~user/pages/home/Home'))

// Import static files
import appleIcon  from '~user/static/images/favicon180x180.png'
import favIcon    from '~user/static/images/favicon32x32.png'
import imageOG    from '~user/static/images/OGimage.jpg'
import fontEuclid from '~user/static/fonts/EuclidCircularB-Medium.woff2'
import "./App.css"


const App = () => {
    const location = useLocation()

    return (
        <>
            <Helmet
                defaultTitle ="гросс маркет"
                titleTemplate="гросс маркет - %s"
            >
                <meta name="viewport" content="width=device-width, minimum-scale=1.0"/>

                <link rel="apple-touch-icon" sizes="180x180"    href={appleIcon} />
                <link rel="icon" type="image/png" sizes="32x32" href={favIcon} />

                <meta name="theme-color" content="#ffffff" />

                <link rel="preload"
                      href={fontEuclid}
                      type="font/woff2" as="font" crossOrigin="anonymous"
                />
                <meta property="og:site_name" content="Гросс маркет"/>
                <meta property="og:title"     content="Гросс маркет. Наша суперцель — стать любимым магазином для каждой семьи"/>
                <meta property="og:description" content="Сотни тысяч наших сотрудников ежедневно работают над достижением нашей суперцели. Мы уверены, что в ближайшие годы достигнем этого и будет здорово, если вместе с тобой." />
                <meta property="og:type"  content="website" />
                <meta property="og:url"   content={process.env.URL_BASE} />
                <meta property="og:image" content={process.env.URL_BASE + imageOG} />
            </Helmet>

            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/"     component={HomePage} />
                    <Route       path="/form" component={VacancyPage} />
                </Switch>
            </AnimatePresence>
        </>
    )
}

export default  App
