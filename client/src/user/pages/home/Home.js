import React, { Component } from "react"
import Helmet from "react-helmet"

import Header    from '~user/components/header/Header'
import Footer    from '~user/components/footer/Footer'

import Slider    from  '~user/components/slider/Slider'
import Vacancy   from '~user/components/vacancy/Vacancy'
import Gallery   from '~user/components/gallery/Gallery'
import Geography from  '~user/components/geography/Geography'

export default class Home extends Component {
    render() {
        return (
            <div className="page__body">
                <Helmet>
                    <title>Главная</title>
                    <meta name="description" content="Home page" />
                </Helmet>
                <Header />
                <main>
                    <Slider />
                    <Vacancy />
                    <Gallery />
                    <Geography />
                </main>
                <Footer />
            </div>
        )
    }
}
