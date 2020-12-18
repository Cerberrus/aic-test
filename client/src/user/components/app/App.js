import React from "react"
import {Switch, Route, useLocation} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"

//For tree shaking
const FormPage = loadable(() => import('~user/pages/form/Form'))
const HomePage = loadable(() => import('~user/pages/home/Home'))
const Header   = loadable(() => import('~user/components/header/Header'))
const Footer   = loadable(() => import('~user/components/footer/Footer'))

//Import static files
import shortIcon from '~user/static/images/temporary/logo.png'
import imageOG   from '~user/static/images/OGimage.jpg'
import "./App.css"

const App = () => {
    const location = useLocation()

    const image = `https://aic.xutd.tk${imageOG}`

    return (
        <>
            <Helmet
                defaultTitle ="гросс маркет"
                titleTemplate="гросс маркет - %s"
            >
                <meta name="viewport" content="width=device-width, minimum-scale=1.0"/>
                <link rel="shortcut icon" href={shortIcon} />

                <meta property="og:site_name" content="Гросс маркет"/>
                <meta property="og:title" content="Наша суперцель — стать любимым магазином для каждой российской семьи"/>
                <meta property="og:description" content="Сотни тысяч наших сотрудников ежедневно работают над достижением нашей суперцели. Мы уверены, что в ближайшие годы достигнем этого и будет здорово, если вместе с тобой." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aic.xutd.tk/" />
                <meta property="og:image" content={image} />
            </Helmet>

                <div className="page__body">
                    <Header theme={location.pathname === '/form' ? 'gray' : 'white'}/>
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <Switch location={location} key={location.pathname}>
                            <Route exact path="/"     component={HomePage} />
                            <Route       path="/form" component={FormPage} />
                        </Switch>
                    </AnimatePresence>
                    <Footer/>
                </div>
        </>
    )
}

export default App

