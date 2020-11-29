import React, { Component, useState } from "react"

// Import Swiper React components
import SwiperCore, { Navigation, EffectFade, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation, EffectFade, Controller]);

// Import static files
import './Slider.css'
import iconArrow from '~user/static/icons/arrow.svg'

// Temporary
import slideOne from '~user/static/images/temporary/slider-1.jpg'
import slideTwo from '~user/static/images/temporary/slider-2.jpg'

export default class Slider extends Component {
    state = {
        firstSwiper: null,
        secondSwiper: null
    }

     render() {
         const setFirstSwiper = (settings) => {
             this.setState({
                 firstSwiper: settings
             });
         }
         const setSecondSwiper = (settings) => {
             this.setState({
                 secondSwiper: settings
             });
         }

        return (
            <div className="hero container">
                <Swiper
                    navigation={{
                        prevEl: '.sliderText__button_prev',
                        nextEl: '.sliderText__button_next'
                    }}
                    onSwiper={setFirstSwiper} controller={{ control: this.state.secondSwiper }}
                    className="hero__slider sliderText"
                >
                    <SwiperSlide className="sliderText__slide">У тебя к этому<br/>талант</SwiperSlide>
                    <SwiperSlide className="sliderText__slide">У тебя<br/>всё под контролем</SwiperSlide>

                    <div className="sliderText__buttonGroup">
                        <button className="slider__button sliderText__button_prev button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                        <button className="slider__button sliderText__button_next button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                    </div>
                </Swiper>

                <Swiper
                    navigation={{
                        prevEl: '.sliderText__button_prev',
                        nextEl: '.sliderText__button_next'
                    }}
                    onSwiper={setSecondSwiper} controller={{ control: this.state.firstSwiper }}
                    effect="fade"
                    className="hero__slider sliderPhoto"
                >
                    <SwiperSlide className="sliderPhoto__slide">
                        <div className="sliderPhoto__wrapper">
                            <img src={slideOne} alt=""/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="sliderPhoto__slide">
                        <div className="sliderPhoto__wrapper">
                            <img src={slideTwo} alt=""/>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        )
    }
}
