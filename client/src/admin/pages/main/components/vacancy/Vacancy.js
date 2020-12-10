import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Vacancy.css'
import axios from "axios";

export default class Vacancy extends Component {

    state = {
        vacancy: {
            list: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getVacancy()
    }

    getVacancy = () => {
        axios({
            method: 'get',
            url: process.env.API_BASE + '/vacancy',
            withCredentials: true
        })
            .then((response) => {
                this.setState({
                    vacancy: {
                        list: response.data,
                        isLoaded: true
                    }
                })
            })
            .catch((error) => {
                console.log('error')
            })
    }

    render() {
        let vacancyList = []
        if (this.state.vacancy.isLoaded) {
            for (let vacancy of this.state.vacancy.list) {
                vacancyList.push(
                    <div className="vacancy__card">
                        <img className="vacancy__image" src={vacancy.path[0]}/>
                        <p className="vacancy__name">{vacancy.title}</p>
                        <p className="vacancy__description">{vacancy.description}</p>
                        <img src="https://aic.xutd.tk/static/icons/close.svg"/>
                        <img src="https://aic.xutd.tk/static/icons/edit.svg"/>
                        <img src="https://aic.xutd.tk/static/icons/hide.svg"/>
                    </div>)
            }
        } else {
                vacancyList.push(
                    <div className="vacancy__card">
                        <img className="vacancy__image"/>
                        <p className="vacancy__name">Загрузка</p>
                        <p className="vacancy__description">Загрузка</p>
                        <img src="https://aic.xutd.tk/static/icons/close.svg"/>
                        <img src="https://aic.xutd.tk/static/icons/edit.svg"/>
                        <img src="https://aic.xutd.tk/static/icons/hide.svg"/>
                    </div>
                )
        }
        return (
            <section className="vacancy">
                <div className="vacancy__top">
                    <h1 className="vacancy_title title">Вакансии</h1>
                    <button className="button_yellow" type="button">Добавить</button>
                </div>
                <div className="vacancy__tableHead">
                    <p>Фото</p>
                    <p>Название</p>
                    <p>Описание</p>
                </div>
                {vacancyList}
            </section>
        )
    }
}