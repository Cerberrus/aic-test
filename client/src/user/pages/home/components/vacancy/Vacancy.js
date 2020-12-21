import React, { Component } from "react"

// Import Swiper React components
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation])

// Import model
import model from "~src/model/model"

// Import static files
import "./Vacancy.css"
import iconArrow from "~src/static/icons/arrow.svg"

// Swiper settings
const swiperBreakpoints = {
    // when window width is >= 280px
    280: {
        slidesPerView: 1,
        centeredSlides: true,
        slideToClickedSlide: true,
        initialSlide: 1,
        spaceBetween: 20
    },
    // when window width is >= 768px
    768: {
        slidesPerView: "auto",
        centeredSlides: false,
        slideToClickedSlide: false,
        initialSlide: 0,
        spaceBetween: 30
    },
}

const swiperNavigation = {
    prevEl: ".sliderVacancy__button_prev",
    nextEl: ".sliderVacancy__button_next"
}

export default class Vacancy extends Component {
    model = new model()

    state = {
        vacancyList: []
    }

    componentDidMount() {
        this.model.getAllVacancies()
            .then(vacancyList => this.setState({vacancyList}))
    }

    toggleVacancy = (id) => {
        const {vacancyList} = this.state
        vacancyList.map((vacancy) => {
            vacancy.id === id ? vacancy.active = !vacancy.active : vacancy.active=false
        })

        this.setState({vacancyList})
    }

    render() {
        const { vacancyList } = this.state

        return (
            <section className="vacancy container">
                <div className="vacancy__header">
                    <h2>вакансии в гросс маркете</h2>
                    <div className="vacancy__buttonGroup slider__buttonGroup">
                        <button  className="slider__button sliderVacancy__button_prev button" aria-label="Предыдущий слайд">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                        <button  className="slider__button sliderVacancy__button_next button" aria-label="Следующий слайд">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                    </div>
                </div>

                <Swiper
                    breakpoints={swiperBreakpoints}
                    navigation={swiperNavigation}
                    className="vacancy__slider vacancySlider"
                >
                    {vacancyList && vacancyList.map((vacancy) => (
                        <SwiperSlide
                            key={vacancy.id}
                            className={`vacancySlider__slide ${vacancy.active && "vacancySlider__slide_active"}`}
                            onClick={() => this.toggleVacancy(vacancy.id)}
                        >
                            <div className="vacancySlider__slideFront" title="Подробнее">
                                <h3 className="vacancySlider__name">{vacancy.title}</h3>
                                {(vacancy.images.length > 1) ? (
                                    <picture>
                                        <source
                                            srcSet={`${vacancy.images[0]} 1x,
                                                     ${vacancy.images[1]} 2x`}
                                            type="image/webp"
                                        />
                                        <img
                                            src={vacancy.images[2]}
                                            srcSet={`${vacancy.images[3]} 2x`}
                                            alt={vacancy.alt}
                                            className="sliderPhoto__image"
                                        />
                                    </picture>
                                ) : (
                                    <img src={vacancy.images[0]} alt={vacancy.alt}/>
                                )}
                            </div>
                            <div className="vacancySlider__slideBack">
                                <p className="vacancySlider__name">{vacancy.title}</p>
                                <p className="slideBack__content">{vacancy.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        )
    }
}
