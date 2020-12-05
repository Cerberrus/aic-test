import React, { Component } from "react"
import Helmet from "react-helmet"
import { motion } from 'framer-motion'

import Header    from '~user/components/header/Header'
import Footer    from '~user/components/footer/Footer'

import Slider    from  './components/slider/Slider'
import Vacancy   from  './components/vacancy/Vacancy'
import Gallery   from  './components/gallery/Gallery'
import Geography from  './components/geography/Geography'

export default class Home extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>главная</title>
                    <meta name="description" content="Home page" />
                </Helmet>

                <motion.main
                    initial={{ opacity: 0, x: '-10vw'}}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{opacity: 0, x: '-10vw' }}
                    transition={{delay: 0.5}}
                >
                    <Slider />
                    <Vacancy />
                    <Gallery />
                    <Geography/>
                </motion.main>
            </>
        )
    }
}
