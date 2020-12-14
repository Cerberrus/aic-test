import React, { Component } from "react"
import { Link } from "react-router-dom"

import getData from "~src/services/getData"

//Import static files
import './CoordinateItem.css'
import axios from "axios";
import {Helmet} from "react-helmet";

export default class CoordinateItem extends Component {
    getData = new getData()

    state = {
        coordinate: undefined,
        typeList:   undefined,
        fields: {
            longitude: undefined,
            latitude:  undefined,
            type:      undefined,
            title:     undefined,
            id:        undefined,
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params

        this.getData.getCoordinate(id)
            .then(response => {
                const coordinate = response.coordinate.features

                this.setState({
                    coordinate: coordinate,
                    typeList:   response.typeList,
                    fields: {
                        longitude: coordinate.geometry.coordinates[0],
                        latitude:  coordinate.geometry.coordinates[1],
                        type:      coordinate.properties.type,
                        title:     coordinate.title,
                        id:        id
                    }
                })
            })
    }

    setValue = (e) => {
        const key    = e.target.name
        const value  = e.target.value
        const fields = this.state.fields

        fields[key]  = value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {id, title, longitude, latitude, type} = this.state.fields

        axios({
            method: 'put',
            url: process.env.API_BASE + `/coordinate/${id}?`+
                `title=${title}`+
                `&longitude=${longitude}`+
                `&latitude=${latitude}`+
                `&typeId=${type}`,
            withCredentials: true
        })
            .then((response) => {
                console.log('Successful')
            })
            .catch((error) => {
                console.log('error')
            })
    }

    newCoord = (e) => {
        e.preventDefault()
        const {id, title, longitude, latitude, type} = this.state.fields

        axios({
            method: 'post',
            url: process.env.API_BASE + `/coordinate?`+
                `title=${title}`+
                `&longitude=${longitude}`+
                `&latitude=${latitude}`+
                `&typeId=${type}`,
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
        const { coordinate, typeList } = this.state

        if(coordinate === undefined) {
            return <h1>Loading...</h1>
        }

        return (
            <>
                <Helmet>
                    <title>{coordinate.title}</title>
                </Helmet>

                <section className="coordinateAdd">
                    <h1 className="title">Координаты</h1>
                    <form className="coordinateAdd__form" onSubmit={this.onSubmit}>
                        <p>Тип</p>

                        <ul className="coordinateAdd__list">
                            <li>
                                <ul className="form__radioGroup">
                                    {typeList.map((item) => (
                                        <li className="radioGroup__item" key={item.id}>
                                            <input
                                                type="radio"
                                                name="type"
                                                id={item.id}
                                                value={item.id}
                                                defaultChecked={item.id === coordinate.properties.type}
                                                hidden
                                                onChange={this.setValue}
                                            />
                                            <label className="radioGroup__radio form__radio" htmlFor={item.id}>
                                                <span>{item.type}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <label>
                                    <span>Долгота</span>
                                    <input
                                        className="form__input"
                                        type="text"
                                        placeholder="00.000"
                                        name="longitude"
                                        defaultValue={coordinate.geometry.coordinates[0]}
                                        onChange={this.setValue}
                                    />
                                </label>
                            </li>
                            <li>
                                <label>
                                    <span>Широта</span>
                                    <input
                                        className="form__input"
                                        type="text"
                                        placeholder="00.000"
                                        name="latitude"
                                        defaultValue={coordinate.geometry.coordinates[1]}
                                        onChange={this.setValue}
                                    />
                                </label>
                            </li>
                            <li>
                                <label>
                                    <span>Название</span>
                                    <textarea
                                        className="requestPage__resume form__input"
                                        placeholder="Введите..."
                                        name="title"
                                        defaultValue={coordinate.title}
                                        onChange={this.setValue}
                                    />
                                </label>
                            </li>
                        </ul>

                        <button className="button_yellow">Сохранить</button>
                        <Link to="/admin/coordinate" className="coordinateAdd__cancel button button_gray">Отменить</Link>
                    </form>
                </section>
            </>
        )
    }
}
