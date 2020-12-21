import React, { Component } from "react"
import Helmet from "react-helmet"
import { AnimatePresence, motion } from "framer-motion"

// Import components
import Loader    from "~user/components/loader/Loader"
import Header    from "~user/components/header/Header"
import Footer    from "~user/components/footer/Footer"
import Slider    from  "./components/slider/Slider"
import Vacancy   from  "./components/vacancy/Vacancy"
import Gallery   from  "./components/gallery/Gallery"
import Geography from  "./components/geography/Geography"

export default class Home extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 800)
    }

    render() {
        const { loading } = this.state

        return (
            <>
                <Helmet title="главная" />

                <AnimatePresence>
                    {loading && <Loader/>}
                </AnimatePresence>

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{delay: 0.1}}
                    className="page__body"
                >
                    <Header theme="white"/>
                    <main>
                        <Slider />
                        <Vacancy />
                        <Gallery />
                        <Geography/>
                    </main>
                    <Footer/>
                </motion.div>
            </>
        )
    }
}
