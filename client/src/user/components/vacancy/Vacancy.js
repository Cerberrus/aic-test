import React, { Component } from 'react'

// Import Swiper React components
import SwiperCore, {Navigation} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Navigation])

// Import styles
import './vacancy.css'

// Import icons
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
    render() {
        return (
            <section className="vacancy">
                <div className="vacancy__header container">
                    <h2>вакансии в гросс маркете</h2>
                    <div className="slider__buttonGroup">
                        <button  className="slider__button sliderVacancy__button_prev button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                        <button  className="slider__button sliderVacancy__button_next button">
                            <svg className="slider__icon"><use xlinkHref={iconArrow}/></svg>
                        </button>
                    </div>
                </div>

                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation={{
                        prevEl: '.sliderVacancy__button_prev',
                        nextEl: '.sliderVacancy__button_next'
                    }}
                    className="vacancy__slider vacancySlider container"
                >
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">товаровед</h3>
                        <img src={slide1} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">водитель</h3>
                        <img src={slide2} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">пекарь</h3>
                        <img src={slide3} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">кассир</h3>
                        <img src={slide4} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">продавец</h3>
                        <img src={slide5} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">товаровед</h3>
                        <img src={slide6} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <h3 className="vacancySlider__name">товаровед</h3>
                        <img src={slide7} alt=""/>
                    </SwiperSlide>
                </Swiper>
            </section>
        )
    }
}