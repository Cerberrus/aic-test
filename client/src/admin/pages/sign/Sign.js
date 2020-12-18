import React, { Component } from "react"
import Helmet from "react-helmet"
import axios from "axios"

// Import model
import model from "~src/model/model"

// Import static files
import './Sign.css'

export default class Sign extends Component{
    model = new model()

    state = {
        fields: {
            username:    '',
            password:    '',
        },
        error: '',
    }

    setFiled = (e) => {
        const fields = this.state.fields
        const key    = e.target.name
        const value  = e.target.value

        fields[key]  = value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { username, password } = this.state.fields


        axios({
            method: 'post',
            url: process.env.API_BASE +'/signin',
            withCredentials: true,
            data:{username, password}
        })
            .then((response)=>{
                console.log(response);
                if (response.status === 201) {
                    return this.props.history.push('/admin')
                } else {
                    this.setState({
                        error: 'Указан неверный логин или пароль'
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
                this.setState({
                    error: 'Указан неверный логин или пароль'
                })
            })

        // this.model.postToSign(fields)
        //     .then((response)=>{
        //         if (response.status === 200) {
        //             return this.props.history.push('/admin')
        //         } else {
        //             this.setState({
        //                 error: 'Указан неверный логин или пароль'
        //             })
        //         }
        //     })
    }

    render() {
        const { username, password, error } = this.state

        return (
            <>
                <Helmet title="авторизация" />

                <main className="authorization">
                    <form className="authorization__form" onSubmit={this.onSubmit}>
                        <h1 className="authorization__title title">Авторизация</h1>
                        <div className="authorization__group">
                            <label>
                                <span>Логин</span>
                                <input
                                    className="form__input"
                                    name="username"
                                    type="text"
                                    placeholder="Введите..."
                                    value={username}
                                    onChange={this.setFiled}/>
                            </label>
                        </div>
                        <div className="authorization__group">
                            <label>
                                <span>Пароль</span>
                                <input
                                    className="form__input"
                                    name="password"
                                    type="password"
                                    placeholder="*************"
                                    value={password}
                                    onChange={this.setFiled}
                                />
                            </label>
                        </div>
                        <button className="authorization__button button_yellow">Авторизоваться</button>
                        {error && <p className="authorization__error">{error}</p>}
                    </form>
                </main>
            </>
        )
    }
}
