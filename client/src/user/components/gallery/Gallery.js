import React, { Component } from "react"

// Import styles
import './gallery.css'

export default class Gallery extends Component {
    render() {
        return (
            <section className="gallery container">
                <h2>мы в инстаграме</h2>

                <ul className="gallery__list">
                    <li className="gallery__item">
                        <img src="" alt=""/>
                    </li>
                    <li className="gallery__item">
                        <img src="" alt=""/>
                    </li>
                    <li className="gallery__item">
                        <img src="" alt=""/>
                    </li>
                    <li className="gallery__item">
                        <img src="" alt=""/>
                    </li>
                    <li className="gallery__item">
                        <img src="" alt=""/>
                    </li>
                </ul>
                <button className="gallery__button button_gray">показать ещё</button>
            </section>
        )
    }
}