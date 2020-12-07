import React, { Component } from 'react'

// Import Swiper React components
import SwiperCore, {Navigation} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Navigation])

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
                    simulateTouch={false}
                    navigation={{
                        prevEl: '.sliderVacancy__button_prev',
                        nextEl: '.sliderVacancy__button_next'
                    }}
                    className="vacancy__slider vacancySlider container"
                >
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">товаровед</h3>
                            <img src={slide1} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <p className="slideBack__content">Доставка товара по магазинам и гипермаркетам компании в обслуживаемом регионе</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">водитель</h3>
                            <img src={slide2} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <p className="slideBack__content">Доставка товара по магазинам и гипермаркетам компании в обслуживаемом регионе</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">пекарь</h3>
                            <img src={slide3} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <div className="slideBack__content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, repellendus?</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">кассир</h3>
                            <img src={slide4} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <div className="slideBack__content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, dignissimos.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">продавец</h3>
                            <img src={slide5} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <div className="slideBack__content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, sed!</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">товаровед</h3>
                            <img src={slide6} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <div className="slideBack__content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, dicta.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="vacancySlider__slide">
                        <div className="vacancySlider__slideFront">
                            <h3 className="vacancySlider__name">товаровед</h3>
                            <img src={slide7} alt=""/>
                        </div>
                        <div className="vacancySlider__slideBack">
                            <div className="slideBack__content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, soluta.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        )
    }
}