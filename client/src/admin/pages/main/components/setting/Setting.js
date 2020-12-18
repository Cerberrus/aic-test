import React, { Component } from "react"
import {Link, Redirect} from "react-router-dom"

import Loader from "~admin/components/loader/Loader"

// Import static files
import './Setting.css'

import model from "~src/model/model"

export default class Setting extends Component {
    model = new model()

    state = {
        settings: {},
        loading:  true
    }

    componentDidMount() {
        setTimeout(() => {
            this.model.getSettings()
                .then((settings) => {
                    this.setState({
                        settings: settings,
                        loading:  false,
                    })
                })
        }, 300)
    }

    setFiled = (e) => {
        const key      = e.target.name
        const value    = e.target.value
        const settings = this.state.settings

        settings[key]  = value
        this.setState({settings})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.model.postSettings(this.state.settings)
            .then((response) => {
                console.log(response);
            })
    }

    render(){
        const { loading, settings } = this.state

        if (loading) {
            return <Loader/>
        }

        return(
            <>
                <h1 className="title">Настройки</h1>
                <form className="setting" onSubmit={this.onSubmit}>
                    <label>
                        <span>Контактый телефон *</span>
                        <input
                            className="form__input"
                            type=" tel"
                            placeholder="+7 ("
                            name="phone"
                            defaultValue={settings.phone}
                            onChange={this.setFiled}
                        />
                    </label>

                    <label>
                        <span>Логин Instagram аккаунта</span>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="login"
                            name="instLogin"
                            defaultValue={settings.instLogin}
                            onChange={this.setFiled}
                        />
                    </label>

                    <label>
                        <span>Пароль Instagram аккаунта</span>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="password"
                            name="instPassword"
                            defaultValue={settings.instPassword}
                            onChange={this.setFiled}
                        />
                    </label>

                    <div className="setting__buttonGroup">
                        <button
                            type="submit"
                            className="setting__button button_yellow"
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className="setting__button button button_gray"
                            onClick={() => window.location.reload()}
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </>
        )
    }
}
