import React, { Component } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Helmet from "react-helmet"

// Import components
import Loader from "~user/components/loader/Loader"
import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"
import Form    from "./components/form/Form"
import Goal    from "./components/goal/Goal"
import Success from "./components/success/Success"

// Import model
import model from "~src/model/model"

// Import static files
import "./Vacancy.css"

export default class Vacancy extends Component {
    model = new model()

    state = {
        loading:  true,
        success: false,
        phone:      "",
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        this.model.getInformation()
            .then(response => {
                this.setState({
                    phone: response.phone
                })
            })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 800)
    }

    onSuccess = () => {
        this.setState({
            success: true
        })
    }

    render() {
        const { success, loading, phone } = this.state

        return (
            <>
                <Helmet title="анкета" />

                <AnimatePresence>
                    {loading && <Loader/>}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{delay: 0.1 }}
                    className="page__body"
                >
                    <Header theme="gray"/>
                    <main className="requestPage container">
                        {/* For toggle components */}
                        <AnimatePresence>
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{delay: 0.2 }}
                                    key="success"
                                >
                                    <Success phone={phone}/>
                                </motion.div>
                            ) : (
                                <motion.div
                                    exit={{ opacity: 0 }}
                                    transition={{delay: 0.2 }}
                                    key="form"
                                >
                                    <h1 className="visuallyHidden">Форма заявки</h1>
                                    <p className="requestPage__title">Работа твоей мечты</p>
                                    <div className="requestPage__content">
                                        <Form onSuccess={this.onSuccess}/>
                                        <Goal phone={phone}/>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                    <Footer/>
                </motion.div>
            </>
        )
    }
}
