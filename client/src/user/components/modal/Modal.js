import React, { Component } from 'react'

// Import static files
import './Modal.css'

export default class Modal extends Component {
    render() {
        const { toggleModal, status } = this.props

        return (
            <>
                <div className={status ? 'modal fadeIn' : 'modal fadeOut'}>
                    <h1>Modal</h1>
                </div>

                <div
                    className={status ? 'overlay fadeIn' : 'overlay fadeOut'}
                    onClick={toggleModal}
                />
            </>
        );
    }
}
