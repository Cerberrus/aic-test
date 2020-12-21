import React from "react"
import { Switch, Route } from "react-router-dom"
import Helmet from "react-helmet"

// Import routes
import UserRoutes  from "~user/Routes"
import AdminRoutes from "~admin/Routes"

// Import components
import errorPage from "~user/pages/error/Error"

// Import static files
import appleIcon  from "~src/static/images/favicon180x180.png"
import favIcon    from "~src/static/images/favicon32x32.png"
import imageOG    from "~src/static/images/OGimage.jpg"
import fontEuclid from "~src/static/fonts/EuclidCircularB-Medium.woff2"
import "./App.css"

const App = () => (
    <>
        <Helmet
            defaultTitle ="гросс маркет"
            titleTemplate="гросс маркет - %s"
        >
            <meta name="viewport" content="width=device-width, minimum-scale=1.0"/>
            <meta name="theme-color" content="#ffffff" />
            <meta property="og:site_name" content="Гросс маркет"/>
            <meta property="og:title" content="Гросс маркет. Наша суперцель — стать любимым магазином для каждой семьи"/>
            <meta property="og:description" content="Сотни тысяч наших сотрудников ежедневно работают над достижением нашей суперцели. Мы уверены, что в ближайшие годы достигнем этого и будет здорово, если вместе с тобой." />
            <meta property="og:type"  content="website" />
            <meta property="og:url"   content={process.env.URL_BASE} />
            <meta property="og:image" content={process.env.URL_BASE + imageOG} />
            <meta name="Description" content="Гросс маркет. Наша суперцель — стать любимым магазином для каждой семьи"/>

            <link rel="apple-touch-icon" sizes="180x180"    href={appleIcon} />
            <link rel="icon" type="image/png" sizes="32x32" href={favIcon} />
            <link rel="preload" href={fontEuclid} type="font/woff2" as="font" crossOrigin="anonymous" />
        </Helmet>

        <Switch>
            <Route exact path={["/", "/form"]}  component={UserRoutes} />
            <Route exact path={["/admin", "/admin/*", "/admin/sign"]} component={AdminRoutes} />
            <Route component={errorPage}/>
        </Switch>
    </>
)

export default  App
