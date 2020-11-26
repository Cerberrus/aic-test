import React, { Component } from "react"
import Helmet from "react-helmet"

import Slider    from "~user/components/slider/Slider"
import Vacancy   from "~user/components/vacancy/Vacancy"
import Instagram from "~user/components/instagram/Instagram"
import Map       from "~user/components/map/Map"

export default class Home extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Главная</title>
                    <meta name="description" content="Home page" />
                </Helmet>
                <main>
                    <h1>Home page</h1>
                    <Slider />
                    <Vacancy />
                    <Instagram />
                    <Map />
                </main>
            </>
        )
    }
}
