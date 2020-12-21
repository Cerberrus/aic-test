import React, {Component} from "react"
import Helmet from "react-helmet"

// Import components
import Header from "~admin/components/header/Header"
import Footer from "~user/components/footer/Footer"

// Import model
import model from "~src/model/model"

// Import static files
import "./Sign.css"

export default class Sign extends Component{
    model = new model()

    state = {
        fields: {
            username:    "",
            password:    "",
        },
        error: "",
    }

    setFiled = (e) => {
        const fields = this.state.fields
        const key    = e.target.name

        fields[key]  = e.target.value
        this.setState({fields})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { fields } = this.state

        this.model.postToSignIn(fields)
            .then((response) => {
                if (response.status === 201) {
                    return this.props.history.replace("/admin")
                } else {
                    this.setState({
                        error: "Указан неверный логин или пароль"
                    })
                }
            })
            .catch(() => {
                this.setState({
                    error: "Указан неверный логин или пароль"
                })
            })
    }

    render() {
        const { username, password, error } = this.state

        return (
            <>
                <Helmet title="авторизация">
                    <meta name="viewport" content="width=1110"/>
                </Helmet>

                <div className="page__body">
                    <Header />
                    <main className="authorization">
                        <form className="authorization__form" onSubmit={this.onSubmit}>
                            <h1 className="authorization__title">Авторизация</h1>
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
                    <Footer />
                </div>
            </>
        )
    }
}
