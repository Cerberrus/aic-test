import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"

import Loader from '~admin/components/loader/Loader'
import FileInput from "~admin/components/file-input/FileInput"

import model from "~src/model/model"

export default class SliderItem extends Component {
    model = new model()

    state = {
        fields: {
            title:  '',
            alt:    '',
            images: []
        },
        error:     '',
        loading: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params

        setTimeout(() => {
            this.getSlide(id)
        }, 700)
    }

    getSlide = (id) => {
        if (id !== 'new') {
            this.model.getSlide(id)
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
            value.append('slider', e.target.files[0])
        }

        fields[key]  = value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { id } = this.props.match.params
        const sendType = id === 'new' ? this.model.postSlide : this.model.putSlide

        this.sendSlide(sendType)
    }

    sendSlide = (sendType) => {
        sendType(this.state.fields)
            .then((response) => {
                if (response.status === 200) {
                    return this.props.history.push('/admin/slider')
                } else {
                    this.setState({
                        error: 'Упс, что-то пошло не так'
                    })
                }
            })
    }

    render() {
        const { fields, loading, error } = this.state

        if(loading) {
            return <Loader/>
        }

        return (
            <>
                <Helmet title={fields.title || 'слайдер'}/>

                <h1 className="admin__title">Слайдер</h1>

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
                                <span>Текст слайда *</span>
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
                        <Link to="/admin/slider" className="button button_gray">Отменить</Link>
                    </div>

                    {error && <p className="admin__error">{error}</p>}
                </form>
            </>
        )
    }
}
