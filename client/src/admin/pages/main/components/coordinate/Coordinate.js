import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"
import  axios     from "axios"

import model from "~src/model/model"

//Import static files
import './Coordinate.css'

export default class Coordinate extends Component {
    model = new model()

    state = {
        coordinateList: [],
    }

    componentDidMount() {
        this.model.getAllCoordinates()
            .then(response => {
                const coordinateList = response.coordinateList.features
                this.setState({coordinateList})
            })
    }

    onDelete = (id) => {
        axios({
            method: 'delete',
            url: process.env.API_BASE + `/coordinate/${id}`,
            withCredentials: true
        })
            .then(() => {
                this.setState(({ coordinateList }) => {
                    const index = coordinateList.findIndex(el => el.id === id)
                    const updatedCoordinateList = [...coordinateList.slice(0, index), ...coordinateList.slice(index + 1)]

                    return {
                        coordinateList: updatedCoordinateList
                    }
                })
            })
            .catch((error) => {
                console.log('error')
            })
    }

    render() {
        const { coordinateList } = this.state

        console.log(coordinateList);

        return (
            <>
                <Helmet>
                    <title>координаты</title>
                </Helmet>

                <section className="coordinate">
                    <div className="coordinate__top">
                        <h1 className="title coordinate__title">Координаты</h1>
                        <Link to='/admin/coordinate/new' className="button button_yellow">Добавить</Link>
                    </div>
                    <div className="coordinate__tableHeader">
                        <p className="coordinate__item">Тип</p>
                        <p className="coordinate__item">Координаты</p>
                        <p className="coordinate__item">Название</p>
                    </div>

                    <ul>
                        {coordinateList && coordinateList.map((item) => (
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
