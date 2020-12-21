import React, { Component } from "react"
import { Link }   from "react-router-dom"
import { Helmet } from "react-helmet"

// Import components
import Loader from "~admin/components/loader/Loader"

// Import model
import model from "~src/model/model"

export default class CoordinateItem extends Component {
    model = new model()

    state = {
        typeList:   [],
        fields: {
            type:      "",
            title:     "",
            longitude: "",
            latitude:  "",
        },
        error:     "",
        loading: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params

        setTimeout(() => {
            this.getCoordinate(id)
        }, 700)
    }

    getCoordinate = (id) => {
        if (id !== "new") {
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
        const sendType = id === "new" ? this.model.postCoordinate : this.model.putCoordinate

        this.sendCoordinate(sendType)
    }

    sendCoordinate = (sendType) => {
        sendType(this.state.fields)
            .then((response) => {
                if (response.status === 200) {
                    return this.props.history.push("/admin/coordinate")
                } else {
                    this.setState({
                        error: "Упс, что-то пошло не так"
                    })
                }
            })
    }

    render() {
        const { fields, typeList, loading, error } = this.state

        if(loading) {
            return <Loader/>
        }

        return (
            <>
                <Helmet title={fields.title || "координаты"}/>

                <h1 className="admin__title">Координаты</h1>

                <form className="admin__form" onSubmit={this.onSubmit}>
                    <ul className="admin__formList">
                        <li>
                            <p className="form__radioTitle">Тип *</p>
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
                                <span>Долгота *</span>
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
                                <span>Широта *</span>
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
                                <span>Название *</span>
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

                    <div className="admin__buttonGroup">
                        <button className="button_yellow">Сохранить</button>
                        <Link to="/admin/coordinate" className="button button_gray">Отменить</Link>
                    </div>

                    {error && <p className="admin__error">{error}</p>}
                </form>
            </>
        )
    }
}
