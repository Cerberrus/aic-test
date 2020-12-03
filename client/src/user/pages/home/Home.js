import React, { Component } from "react"
import Helmet from "react-helmet"

import Header    from '~user/components/header/Header'
import Footer    from '~user/components/footer/Footer'

import Slider    from  './components/slider/Slider'
import Vacancy   from  './components/vacancy/Vacancy'
import Gallery   from  './components/gallery/Gallery'
import Geography from  './components/geography/Geography'

export default class Home extends Component {
    render() {
        return (
            <div className="page__body">
                <Helmet>
                    <title>главная</title>
                    <meta name="description" content="Home page" />
                </Helmet>
                <Header />
                <main>
                    <Slider />
                    <Vacancy />
                    <Gallery />
                    <Geography/>
                </main>
                <Footer />
            </div>
        )
    }
}
