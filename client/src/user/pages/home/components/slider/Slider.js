import React, { Component } from "react"

// Import Swiper React components
import SwiperCore, { Navigation, EffectFade, Controller } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation, EffectFade, Controller])

// Import model
import model from "~src/model/model"

// Import static files
import "./Slider.css"
import iconArrow from "~src/static/icons/arrow.svg"

// Swiper settings
const swiperNavigation = {
    prevEl: ".sliderText__button_prev",
    nextEl: ".sliderText__button_next"
}

export default class Slider extends Component {
    model = new model()

    state = {
        firstSwiper:  null,
        secondSwiper: null,
        slides:       [],
    }

    componentDidMount() {
        this.model.getAllSlides()
            .then(slides => this.setState({slides}))
    }

    setFirstSwiper = (firstSwiper) => {
        this.setState({firstSwiper})
    }

    setSecondSwiper = (secondSwiper) => {
        this.setState({secondSwiper})
    }

    render() {
        const { slides } = this.state

        return (
            <div className="hero container">
                <Swiper
                    navigation={swiperNavigation}
                    onSwiper={this.setFirstSwiper}
                    controller={{ control: this.state.secondSwiper }}
                    className="hero__slider sliderText"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="sliderText__slide">{slide.title}</SwiperSlide>
                    ))}

                    <div className="sliderText__buttonGroup">
                        <button className="slider__button sliderText__button_prev button" aria-label="Предыдущий слайд">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                        <button className="slider__button sliderText__button_next button" aria-label="Следующий слайд">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                    </div>
                </Swiper>

                <Swiper
                    navigation={swiperNavigation}
                    onSwiper={this.setSecondSwiper}
                    controller={{ control: this.state.firstSwiper }}
                    effect="fade"
                    className="hero__slider sliderPhoto"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="sliderPhoto__slide">
                            <div className="sliderPhoto__wrapper">
                                {(slide.images.length > 1) ? (
                                    <picture>
                                        <source
                                            srcSet={`${slide.images[0]} 1x,
                                                     ${slide.images[1]} 2x`}
                                            type="image/webp"
                                        />
                                        <img
                                            src={slide.images[2]}
                                            srcSet={`${slide.images[3]} 2x`}
                                            alt={slide.alt}
                                            className="sliderPhoto__image"
                                        />
                                    </picture>
                                ) : (
                                    <img src={slide.images[0]} alt={slide.alt}/>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )
    }
}
