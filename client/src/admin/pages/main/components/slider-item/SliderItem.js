import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"

import Loader from '~admin/components/loader/Loader'
import FileInput from "~admin/components/file-input/FileInput"

import model from "~src/model/model"

//Import static files
import './SliderItem.css'
import iconFile from "~user/static/icons/clip.svg";

export default class SliderItem extends Component {
    model = new model()

    state = {
        fields: {},
        loading: true,
    }

    componentDidMount() {
        const { id } = this.props.match.params

        this.model.getSlide(id)
            .then((fields) => {
                this.setState({
                    fields: fields,
                    loading: false
                })
            })
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

        // id === 'new' ? this.addCoordinate() : this.changeCoordinate()
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
        const {loading, fields } = this.state

        if(loading) {
            return <Loader/>
        }

        return (
            <>
                <Helmet>
                    <title>{fields.title || 'слайдер'}</title>
                </Helmet>

                <section>
                    <h1 className="title">Слайдер</h1>
                    <form onSubmit={this.onSubmit}>
                        <ul className="sliderItem__list">
                            <li>
                                <FileInput
                                    name={'file'}
                                    fileName={fields.images[2]}
                                    onLoadFile={this.setFiled}
                                />
                            </li>
                            <li>
                                <label>
                                    <span>Подпись к изображению</span>
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
                                    <span>Описание</span>
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

                        <div className="sliderItem__buttonGroup">
                            <button className="button_yellow">Сохранить</button>
                            <Link to="/admin/slider" className="button button_gray">Отменить</Link>
                        </div>
                    </form>
                </section>
            </>
        )
    }
}
