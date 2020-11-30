import React, { Component } from "react"
import axios from 'axios'
// Import styles
import './Gallery.css'

export default class Gallery extends Component {
    state = {
        images: []
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

        if (images.length) {
            return (
                <section className="gallery container">
                    <h2>мы в инстаграме</h2>

                    <ul className="gallery__list">

                        {images.map((image, index) => (
                            <li key={index} className="gallery__item">
                                <img src={image} alt="" className="gallery__image"/>
                            </li>
                        ))}
                    </ul>
                    <button className="gallery__button button_gray">показать ещё</button>
                </section>
            )
        }

        return <h1>Ждать</h1>

    }
}
