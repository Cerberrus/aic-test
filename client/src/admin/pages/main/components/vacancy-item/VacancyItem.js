import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"

import Loader from '~admin/components/loader/Loader'
import FileInput from "~admin/components/file-input/FileInput"

import model from "~src/model/model"

export default class VacancyItemItem extends Component {
    model = new model()

    state = {
        fields: {
            title:       '',
            alt:         '',
            description: '',
            images:      []
        },
        error:     '',
        loading: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params

        setTimeout(() => {
            this.getVacancy(id)
        }, 700)
    }

    getVacancy = (id) => {
        if (id !== 'new') {
            this.model.getVacancy(id)
                .then((fields) => {
                    this.setState({
                        fields: fields,
                        loading: false
                    })
                })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    setFiled = (e) => {
        const fields = this.state.fields
        const key    = e.target.name
        let   value  = e.target.value

        if (key === 'file') {
            value = new FormData()
            value.append('vacancy', e.target.files[0])
        }

        fields[key]  = value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { id } = this.props.match.params
        const sendType = id === 'new' ? this.model.postVacancy : this.model.putVacancy

        sendType(this.state.fields)
            .then((response) => {
                if (response.status === 200) {
                    return this.props.history.push('/admin/vacancy')
                } else {
                    this.setState({
                        error: 'Упс, что-то пошло не так'
                    })
                }
            })
    }

    render() {
        const { fields, loading, error } = this.state

        if( loading) {
            return <Loader/>
        }

        return (
            <>
                <Helmet title={fields.title || 'вакансия'}/>

                <h1 className="admin__title">Вакансия</h1>

                <form className="admin__form" onSubmit={this.onSubmit}>
                    <ul className="admin__formList">
                        <li>
                            <FileInput
                                name={'file'}
                                fileName={fields.images[2]}
                                onLoadFile={this.setFiled}
                            />
                        </li>
                        <li>
                            <label>
                                <span>Подпись к изображению *</span>
                                <textarea
                                    className="form__input"
                                    placeholder="Введите..."
                                    name="alt"
                                    defaultValue={fields.alt}
                                    onChange={this.setFiled}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Наименование профессии *</span>
                                <textarea
                                    className="form__input"
                                    placeholder="Введите..."
                                    name="title"
                                    defaultValue={fields.title}
                                    onChange={this.setFiled}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Описание *</span>
                                <textarea
                                    className="form__input"
                                    placeholder="Введите..."
                                    name="description"
                                    defaultValue={fields.description}
                                    onChange={this.setFiled}
                                />
                            </label>
                        </li>
                    </ul>

                    <div className="admin__buttonGroup">
                        <button className="button_yellow">Сохранить</button>
                        <Link to="/admin/vacancy" className="button button_gray">Отменить</Link>
                    </div>

                    {error && <p className="admin__error">{error}</p>}
                </form>
            </>
        )
    }
}
