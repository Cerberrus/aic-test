import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios    from "axios"

// Import static files
import './Vacancy.css'

export default class Vacancy extends Component {
    state = {
        vacancyList: [],
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
                    vacancyList: response.data
                })
            })
            .catch((error) => {
                console.log('error')
            })
    }

    render() {
        const { vacancyList } = this.state

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
                <ul>
                    {vacancyList && vacancyList.map((vacancy) => (
                        <li className="vacancy__card" key={vacancy.id}>
                            <img className="vacancy__image" src={vacancy.path[0]} />
                            <p className="vacancy__name">{vacancy.title}</p>
                            <p className="vacancy__description">{vacancy.description}</p>
                            <button className="vacancy__delete" title="Удалить">
                                <img src="https://aic.xutd.tk/static/icons/close.svg"/>
                            </button>
                            <Link to="" title="Редактировать">
                                <img src="https://aic.xutd.tk/static/icons/edit.svg"/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}