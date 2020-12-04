import React, { Component } from 'react'

// Import static files
import './Modal.css'
import iconCross from '~user/static/icons/cross.svg'

export default class Modal extends Component {
    state = {
        headerSticky: false
    }

    onScroll = (e) => {
        const scrollTop = e.target.scrollTop

        if (scrollTop > 90) {
            this.setState({
                headerSticky: true
            })
        } else if (scrollTop < 35) {
            this.setState({
                headerSticky: false
            })
        }
    }

    render() {
        const { toggleModal, showModal, title, content } = this.props
        const { headerSticky } = this.state

        return (
            <>
                <div className={showModal ? 'modal fadeIn' : 'modal fadeOut'}>
                    <div className={headerSticky ?  'modal__header modal__header_fixed' : 'modal__header'}>
                        <p className="modal__title">{title}</p>
                        <button className="modal__close" onClick={toggleModal}><svg className="modal__closeIcon"><use xlinkHref={iconCross}/></svg></button>
                    </div>
                    <div className="modal__content" onScroll={this.onScroll}>
                        {content}
                    </div>
                </div>

                <div
                    className={showModal ? 'overlay fadeIn' : 'overlay fadeOut'}
                    onClick={toggleModal}
                />
            </>
        );
    }
}
