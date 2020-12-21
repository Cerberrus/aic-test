import React, { Component } from "react"

// Import components
import Loader from "~admin/components/loader/Loader"

// Import model
import model from "~src/model/model"

export default class Setting extends Component {
    model = new model()

    state = {
        settings:   {},
        success: false,
        error:   false,
        loading:  true,
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
        }, 700)
    }

    setFiled = (e) => {
        const key   = e.target.name
        const value = e.target.value

        const settings = this.state.settings
        settings['success'] = false
        settings[key]       = value

        this.setState({settings})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.model.postSettings(this.state.settings)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        error:  false,
                        success: true,
                    })
                } else {
                    this.setState({
                        success: false,
                        error:    true
                    })
                }
            })
    }

    render(){
        const { success, loading, settings, error  } = this.state

        if (loading) {
            return <Loader/>
        }

        return(
            <>
                <h1 className="admin__title">Настройки</h1>

                <form className="admin__form" onSubmit={this.onSubmit}>
                    <ul className="admin__formList">
                        <li>
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
                        </li>
                        <li>
                            <label>
                                <span>Имя пользователя Instagram аккаунта</span>
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="login"
                                    name="instLogin"
                                    defaultValue={settings.instLogin}
                                    onChange={this.setFiled}
                                />
                            </label>
                        </li>
                    </ul>

                    <div className="admin__buttonGroup">
                        <button
                            type="submit"
                            className="button_yellow"
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className="button_gray"
                            onClick={() => window.location.reload()}
                        >
                            Отменить
                        </button>
                    </div>

                    {error && <p className="admin__error">Упс! Что-то пошло не так</p>}
                    {success && <p className="admin__success">Настройки успешно применены</p>}
                </form>
            </>
        )
    }
}
