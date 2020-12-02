import React, { Component } from "react"
import axios from 'axios'

// Import styles
import './Gallery.css'

export default class Gallery extends Component {
    state = {
        images: Array.from({length: 5})
    }

    componentDidMount() {
        this.getImages()
    }

    async getImages() {
        const response = await axios({
            method: 'get',
            url: 'http://192.168.0.200:3000/api/instagram/image',
        })
        console.log(response);

        this.setState({
            images: response.data
        })
    }

    render() {
        const {images} = this.state

        return (
            <section className="gallery container">
                <h2>мы в инстаграме</h2>

                <ul className="gallery__list">
                    {images.map((image, index) => (
                        <li key={index} className={!image ? 'gallery__item block_load' : 'gallery__item'}>
                            {image && <img src={image} alt="" className="gallery__image"/>}
                        </li>
                    ))}
                </ul>
                <button className="gallery__button button_gray">показать ещё</button>
            </section>
            )
    }
}
