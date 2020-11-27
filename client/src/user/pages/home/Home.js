import React, { Component } from "react"
import Helmet from "react-helmet"

import Slider    from "~user/components/slider/Slider"
import Vacancy   from "~user/components/vacancy/Vacancy"
import Gallery   from "~user/components/gallery/Gallery"
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
                    <Slider />
                    <Vacancy />
                    <Gallery />
                    <Map />
                </main>
            </>
        )
    }
}
