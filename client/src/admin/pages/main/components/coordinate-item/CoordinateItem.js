import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"

import Loader from '~admin/components/loader/Loader'

import model from "~src/model/model"

//Import static files
import './CoordinateItem.css'

export default class CoordinateItem extends Component {
    model = new model()

    state = {
        typeList:   [],
        fields: {
            id:        undefined,
            type:      undefined,
            title:     undefined,
            longitude: undefined,
            latitude:  undefined,
        },
        loading: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.getCoordinate(id)
    }

    getCoordinate = (id) => {
        if (id !== 'new') {
            this.model.getCoordinate(id)
                .then((fields) => {
                    this.setState({fields})
                    this.getCoordinateTypes()
                })
        } else {
            this.getCoordinateTypes()
        }
    }

    getCoordinateTypes = () => {
        this.model.getCoordinateTypes()
            .then((typeList) => {
                this.setState({
                    typeList: typeList,
                    loading: false
                })
            })
    }
    
    setFiled = (e) => {
        const key    = e.target.name
        const value  = e.target.value
        const fields = this.state.fields

        fields[key]  = value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { id } = this.props.match.params

        id === 'new' ? this.addCoordinate() : this.changeCoordinate()
    }

    addCoordinate = () => {
        this.model.postCoordinate(this.state.fields)
            .then((response) => {
                console.log(response);
            })
    }

    changeCoordinate = () => {
        this.model.putCoordinate(this.state.fields)
            .then((response) => {
                console.log(response);
            })
    }

    render() {
        const {loading, fields, typeList } = this.state

        if(loading) {
            return <Loader/>
        }

        return (
            <>
                <Helmet>
                    <title>{fields.title || 'координаты'}</title>
                </Helmet>

                <section className="coordinateAdd">
                    <h1 className="title">Координаты</h1>
                    <form className="coordinateAdd__form" onSubmit={this.onSubmit}>
                        <p>Тип</p>

                        <ul className="coordinateAdd__list">
                            <li>
                                <ul className="form__radioGroup">
                                    {typeList.map((type) => (
                                        <li className="radioGroup__item" key={type.id}>
                                            <input
                                                type="radio"
                                                name="type"
                                                id={type.id}
                                                value={type.id}
                                                defaultChecked={type.id === fields.type}
                                                onChange={this.setFiled}
                                                hidden
                                            />
                                            <label className="radioGroup__radio form__radio" htmlFor={type.id}>
                                                <span>{type.title}</span>
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
                                        defaultValue={fields.longitude}
                                        onChange={this.setFiled}
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
                                        defaultValue={fields.latitude}
                                        onChange={this.setFiled}
                                    />
                                </label>
                            </li>
                            <li>
                                <label>
                                    <span>Название</span>
                                    <textarea
                                        className="form__input"
                                        placeholder="Введите..."
                                        name="title"
                                        defaultValue={fields.title}
                                        onChange={this.setFiled}
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
