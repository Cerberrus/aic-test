import React, { Component } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Import static files
import './Modal.css'
import iconCross from '~user/static/icons/cross.svg'

export default class Modal extends Component {
    state = {
        headerSticky: false,
    }

    onScroll = (e) => {
        const headerSticky = e.target.scrollTop > 10
        this.setState({headerSticky})
    }

    render() {
        const { toggleModal, showModal, title, content } = this.props
        const { headerSticky } = this.state

        return (
            <AnimatePresence>
                {showModal && (<>
                    <motion.div
                        className="modal"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.3 }
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className={headerSticky ?  'modal__header modal__header_fixed' : 'modal__header'}>
                            <p className="modal__title">{title}</p>
                            <button className="modal__close" onClick={toggleModal}><svg className="modal__closeIcon"><use xlinkHref={iconCross}/></svg></button>
                        </div>
                        <div className="modal__content" onScroll={this.onScroll}>
                            {content}
                        </div>
                    </motion.div>

                    <motion.div
                        className="overlay"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.3 }
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3 }
                        }}
                        onClick={toggleModal}
                    />
                </>)}
            </AnimatePresence>
        )
    }
}
