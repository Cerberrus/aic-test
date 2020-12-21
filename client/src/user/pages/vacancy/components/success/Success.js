import React, { Component } from "react"
import { AnimatePresence }  from "framer-motion"

// Import components
import Loader from "~user/components/loader/Loader"

// Import static files
import "./Success.css"

export default class Success extends Component {
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
        const { phone }   = this.props

        return (
            <>
                <AnimatePresence>
                    {loading && <Loader/>}
                </AnimatePresence>

                <div className="success">
                    <h1 className="success__title">Ждем тебя!</h1>
                    <div className="success__epilogue">
                        <div>
                            <p>В 2020 году самыми востребованными умениями и качествами на рынке труда станут: </p>
                            <p className="success__decorText success__text_size_small">Умение ставить цели, планировать свое время, инициативность, настойчивость, высокая мотивация, умение эффективно общаться, любознательность. </p>
                            <p>А профессиональным навыкам можно научить любого человека.</p>
                        </div>
                        <div>
                            <p className="success__text_size_medium">Остались вопросы?</p>
                            <a href={`tel:${phone}`} className="success__link button button_gray">+7{phone}</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
