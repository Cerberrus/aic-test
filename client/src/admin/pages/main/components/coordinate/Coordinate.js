import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios    from "axios"

//Import static files
import './Coordinate.css'

export default class Navigation extends Component {
    state = {
        coordinateList: []
    }

    componentDidMount() {
        this.getCoordinate()
    }

    getCoordinate = () => {
        axios({
            method: 'get',
            url: process.env.API_BASE + '/coordinate',
            withCredentials: true
        })
            .then((response) => {
                this.setState({
                    coordinateList: response.data.coordinateList
                })
            })
            .catch((error)=>{
                console.log('error')
            })
    }
    render() {
        const { features } = this.state.coordinateList

        return(
            <section className="coordinate">
                <div className="coordinate__top">
                    <h1 className="title coordinate__title">Координаты</h1>
                    <Link to='' className="button button_yellow">Добавить</Link>
                </div>
                <div className="coordinate__tableHeader">
                    <p className="coordinate__item">Тип</p>
                    <p className="coordinate__item">Координаты</p>
                    <p className="coordinate__item">Название</p>
                </div>
                <ul>
                    {features && features.map((item) => (
                        <li className="coordinate__card" key={item.id}>
                            <p className="coordinate__type">{item.properties.typeTitle}</p>
                            <p className="coordinate__cords">{item.geometry.coordinates[0]} | {item.geometry.coordinates[1]}</p>
                            <p className="coordinate__designation">{item.title}</p>
                            <ul className="coordinate__cardList">
                                <li>
                                    <Link to="" title="Редактировать">
                                        <img src="https://aic.xutd.tk/static/icons/edit.svg"  className="coordinate__img" alt=""/>
                                    </Link>
                                </li>
                                <li>
                                    <button title="Удалить">
                                        <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}