import React, { Component } from 'react'

// Import Swiper React components
import SwiperCore, {Navigation} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation])

import getData from "~user/services/getData"

// Import static files
import './Vacancy.css'
import iconArrow from '~user/static/icons/arrow.svg'

// Temporary
import slide1 from '~user/static/images/temporary/vacancy-1.png'
import slide2 from '~user/static/images/temporary/vacancy-2.png'
import slide3 from '~user/static/images/temporary/vacancy-3.png'
import slide4 from '~user/static/images/temporary/vacancy-4.png'
import slide5 from '~user/static/images/temporary/vacancy-5.png'
import slide6 from '~user/static/images/temporary/vacancy-6.png'
import slide7 from '~user/static/images/temporary/vacancy-7.png'

export default class Vacancy extends Component {
    getData = new getData()

    state = {
        vacancyList: []
    }

    componentDidMount() {
        this.getData.getVacancies()
            .then(vacancyList => this.setState({vacancyList}))
    }

    render() {
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
                slidesPerView: 'auto',
                centeredSlides: false,
                slideToClickedSlide: false,
                initialSlide: 0,
                spaceBetween: 30
            },
        }

        const swiperNavigation = {
            prevEl: '.sliderVacancy__button_prev',
            nextEl: '.sliderVacancy__button_next'
        }

        const { vacancyList } = this.state

        return (
            <section className="vacancy">
                <div className="vacancy__header container">
                    <h2>вакансии в гросс маркете</h2>
                    <div className="vacancy__buttonGroup slider__buttonGroup">
                        <button  className="slider__button sliderVacancy__button_prev button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                        <button  className="slider__button sliderVacancy__button_next button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                    </div>
                </div>

                <Swiper
                    breakpoints={swiperBreakpoints}
                    navigation={swiperNavigation}
                    className="vacancy__slider vacancySlider"
                >
                    {vacancyList.map((vacancy, index) => (
                        <SwiperSlide key={index} className="vacancySlider__slide">
                            <div className="vacancySlider__slideFront">
                                <h3 className="vacancySlider__name">{vacancy.title}</h3>
                                <img src={vacancy.images[0]} alt={vacancy.alt} />
                            </div>
                            <div className="vacancySlider__slideBack">
                                <p className="slideBack__content">{vacancy.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        )
    }
}
