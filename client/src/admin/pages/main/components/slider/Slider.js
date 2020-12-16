import React, {Component} from "react"
import { Link } from "react-router-dom"

import model from "~src/model/model"

// Import static files
import './Slider.css'

export default class Slider extends Component{
    model = new model()

    state = {
        sliderList: [],
        loading: true
    }

    componentDidMount() {
        this.model.getAllSlides()
            .then(sliderList => {
                this.setState({
                    sliderList: sliderList,
                    loading: false
                })
            })
    }

    render(){
        const { sliderList, loading } = this.state

        if (loading) {
            return <h1>Загрузка</h1>
        }

        return(
            <main>
                <section className="sliderAdmin">
                    <div className="sliderAdmin__top">
                        <h1 className="sliderAdmin__title title">Слайдер</h1>
                        <button className="button_yellow" type="button">Добавить</button>
                    </div>
                    <div className="sliderAdmin__tableHead">
                        <p>Фото</p>
                        <p>Название</p>
                        <p>Описание</p>
                    </div>
                    <ul>
                        {sliderList.map((slider) => (
                            <li key={slider.id} className="sliderAdmin__card">
                                <img src={slider.images[0]} aria-hidden={true}/>
                                <p className="sliderAdmin__name">{slider.title}</p>
                                <p>{slider.alt}</p>
                                <ul className="sliderAdmin__buttonGroup">
                                    <li>
                                        <Link to={`/admin/slider/${slider.id}`} title="Редактировать">
                                            <img src="https://aic.xutd.tk/static/icons/edit.svg" aria-hidden={true}/>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="coordinate__button"
                                            title="Удалить"
                                            onClick={() => this.onDelete(slider.id)}
                                        >
                                            <img src="https://aic.xutd.tk/static/icons/close.svg" aria-hidden={true}/>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        )
    }
}