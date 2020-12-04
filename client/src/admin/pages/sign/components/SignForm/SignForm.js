import React, {Component} from "react"

import './SignForm.css'

export default class SignForm extends Component{
    state = {
        username: '',
        password: ''
    }

    onChangeUsername = (e)=>{
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword= (e)=>{
        this.setState({
            password: e.target.value
        })
    }
    onSubmit= (e)=>{
        e.preventDefault()
        this.props.toSignIn(this.state.username, this.state.password)
    }

    render() {
        return (
        <form className="authorization" onSubmit={this.onSubmit}>
            <h1 className="title authorization__title">Авторизация</h1>
            <div className="authorization__group">
                <label>
                    <span>Логин</span>
                    <input className="input" type="text" placeholder="Введите..." value={this.state.username} onChange={this.onChangeUsername}/>
                </label>
            </div>
            <div className="authorization__group">
                <label>
                    <span>Пароль</span>
                    <input className="input" type="password" placeholder="*************" value={this.state.password} onChange={this.onChangePassword}/>
                </label>
            </div>
            <button className="button button_yellow">Авторизоваться</button>
        </form>
        )
    }
}