import React, { Component } from "react"
import axios from 'axios'

// Import styles
import './Gallery.css'

export default class Gallery extends Component {
    state = {
        images: Array.from({length: 5}),
        length: 5,
    }

    componentDidMount() {
        this.getImages()
    }

    async getImages() {
        const response = await axios({
            method: 'get',
            url: 'http://xutd.tk/api/instagram/image',
        })

        if (response.data) {
            this.setState({
                images: response.data
            })
        }
    }

    continueLoad = () => {
        const length = this.state.length + 4
        this.setState({length})
    }

    render() {
        let {images, length} = this.state
        const showList = images.slice(0, length)

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
}
