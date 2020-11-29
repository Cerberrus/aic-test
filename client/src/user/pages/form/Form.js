import React, { Component } from "react"
import Helmet  from "react-helmet"

import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"

// Import static files
import './Form.css'

export default class Form extends Component {
    render() {
        return (
            <div className="page__body">
                <Helmet>
                    <title>Анкета</title>
                    <meta name="description" content="Form page" />
                </Helmet>
                <Header />
                <main className="requestPage container">
                    <h1 className="visuallyHidden">Форма заявки</h1>
                    <p className="requestPage__title">Работа твоей мечты</p>

                    <div className="requestPage__content">
                        <form className="requestPage__form form">
                            <div>
                                <select name="" id=""></select>
                            </div>
                            <label>
                                <span>ФИО *</span>
                                <input type="text" className="form__input" placeholder="Ваши данные"/>
                            </label>
                            <label>
                                <span>Дата рождения *</span>
                                <input type="date" placeholder="28.07.2002"/>
                            </label>
                            <label>
                                <span>Пол</span>
                                <input type="radio" name="sex" value="мужской" defaultChecked/>
                                <input type="radio" name="sex" value="женский"/>
                            </label>
                            <label>
                                <span>Контактный телефон *</span>
                                <input type="text" className="form__input" placeholder="+7 ("/>
                            </label>
                            <label>
                                <span>Электронная почта</span>
                                <input type="email" className="form__input" placeholder="E-mail"/>
                            </label>
                            <label>
                                <span>Резюме</span>
                                <textarea className="form__input"/>
                            </label>
                            <input type="file" />

                            <label>
                                <input type="checkbox"/>
                                <span>я подтверждаю согласие на обработку персональных<br/>данных и принимаю условия рассмотрения обращений *</span>
                            </label>

                            <button className="form__button button_gray">Отправить</button>
                        </form>
                        <section className="requestPage__goal goal">
                            <h2 className="goal__tile">Наша суперцель</h2>
                            <p>
                                — стать любимым магазином для каждой российской семьи.<br/><br/>
                                Сотни тысяч наших сотрудников ежедневно работают над её достижением.<br/><br/>
                                Мы уверены, что в ближайшие годы достигнем этого и будет здорово,<br/>
                                если вместе с тобой.
                            </p>
                            <a href="tel:79264331416" className="goal__link button button_gray">+7 (926) 433-14-16</a>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}


