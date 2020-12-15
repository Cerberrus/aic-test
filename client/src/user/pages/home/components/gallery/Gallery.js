import React, { Component } from "react"

import model from "~src/model/model"

// Import styles
import './Gallery.css'

export default class Gallery extends Component {
    model = new model()

    state = {
        images: Array.from({length: 5}),
        length: 5,
    }

    componentDidMount() {
        this.model.getAllInstagramImages()
            .then(images => this.setState({images}))
    }

    continueLoad = () => {
        const count = (document.documentElement.clientWidth >= 1200) ? 4 : 3

        const length = this.state.length + count
        this.setState({length})
    }

    render() {
        let {images, length} = this.state
        const showList = images.slice(0, length)

        if (showList.length) {
            return (
                <section className="gallery container">
                    <h2>мы в инстаграме</h2>

                    <ul className="gallery__list">
                        {showList.map((image, index) => (
                            <li key={index} className={!image ? 'gallery__item block_load' : 'gallery__item'}>
                                {image && <img src={image}  alt="" className="gallery__image" /> }
                            </li>
                        ))}
                    </ul>
                    <button className="gallery__button button_gray" onClick={this.continueLoad}>показать ещё</button>
                </section>
            )
        }

        return false
    }
}
