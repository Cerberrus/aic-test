import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"
import axios      from "axios"

//Import static files
import './Coordinate.css'

export default class Coordinate extends Component {
    state = {
        coordinateList: [],
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: process.env.API_BASE + '/coordinate',
            withCredentials: true
        })
            .then((response) => {
                const coordinateList = response.data.coordinateList
                this.setState({coordinateList})
            })
            .catch((error)=>{
                console.log('error')
            })
    }

    onDelete = (id) => {
        axios({
            method: 'delete',
            url: process.env.API_BASE + `/coordinate/${id}`,
            withCredentials: true
        })
            .then((response) => {
                console.log('Successful')
            })
            .catch((error) => {
                console.log('error')
            })
    }

    render() {
        const { features } = this.state.coordinateList

        return (
            <>
                <Helmet>
                    <title>координаты</title>
                </Helmet>

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
                                        <Link to={`/admin/coordinate/${item.id}`} title="Редактировать">
                                            <img src="https://aic.xutd.tk/static/icons/edit.svg"  className="coordinate__img" alt=""/>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="coordinate__button" title="Удалить" onClick={() => this.onDelete(item.id)}>
                                            <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
            </>
        )
    }
}
