import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Slider.css'

export default class Slider extends Component{

    render(){
        return(
            <main>
                <section className="slider">
                    <div className="slider__top">
                        <h1 className="slider__title title">Слайдер</h1>
                        <button className="button_yellow" type="button">Добавить</button>
                    </div>
                    <div className="slider__tableHead">
                        <p>Фото</p>
                        <p>Название</p>
                        <p>Описание</p>
                    </div>
                    <div className="slider__card">
                        <img className="slider__image" src="images/Frame%2047.png" alt=""/>
                            <p className="slider__name">У тебя к этому талант</p>
                            <p className="slider__description">Доставка товара по магазинам и гипермаркетам компании в
                                обслуживаемом регионе</p>
                            <img src="images/close.svg" alt=""/>
                                <img src="images/edit.svg" alt=""/>
                                    <img src="images/hide.svg" alt=""/>
                    </div>
                </section>
            </main>
        )
    }
}