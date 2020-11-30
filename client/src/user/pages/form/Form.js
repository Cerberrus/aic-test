import React, { Component } from "react"
import Helmet  from "react-helmet"
import NumberFormat from 'react-number-format'

import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"

// Import static files
import './Form.css'
import iconCheck from '~user/static/icons/check.svg'
import axios from "axios"

export default class Form extends Component {
    state = {
        checkName:    '',
        checkDate:    '',
        checkPhone:   '',
        checkMail:    '',
        checkResume:  '',
        error:        false
    }

    validation = async (e) => {
        const key =   e.target.name
        const value = e.target.value
        let result = true


        const data = new FormData()
        const imagedata = e.target.files[0];
        data.append('vacancyImage', imagedata);
        console.log(data)

         const response = await axios({
            method: 'post',
             headers: {
                 'Content-Type': 'multipart/form-data',
             },
            url: 'http://192.168.0.200:3000/api/job-vacancy?title=GenochkaX132&imageDescription=Jopa',
            data: data
        })
        console.log(response);

        const checkNameReg   = /./
        const checkResumeReg = /./
        const checkDateReg   = /^(\d{4})[\s\.\/-](\d{2})[\s\.\/-](\d{2})$/
        const checkPhoneReg  = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        const checkMailReg   = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        switch (key) {
            case 'checkName':
                result = checkNameReg.test(value)
                break
            case 'checkDate':
                result = checkDateReg.test(value)
                break
            case 'checkPhone':
                result = checkPhoneReg.test(value)
                break
            case 'checkMail':
                result = checkMailReg.test(value)
                break
            case 'checkResume':
                result = checkResumeReg.test(value)
                break
            default:
                break
        }

        if (result) {
            this.setState({
                [key]: value
            })
        }
    }

    submit = (e) => {
        e.preventDefault()

        console.log(e);
    }

    render() {
        const { checkName, checkDate, checkPhone, checkMail, checkResume } = this.state

        return (
            <>
                <Helmet>
                    <title>Анкета</title>
                    <meta name="description" content="Form page" />
                </Helmet>

                <div className="page__body">
                    <Header />
                    <main className="requestPage container">
                        <h1 className="visuallyHidden">Форма заявки</h1>
                        <p className="requestPage__title">Работа твоей мечты</p>

                        <div className="requestPage__content">
                            <form className="requestPage__form form" onSubmit={this.submit}>
                                <label>
                                    <span>Вакансия * <svg className="form__iconCheck"><use xlinkHref={iconCheck}/></svg></span>
                                    <select name="" id="" className="form__input_select form__input">
                                        <option value="">Товаровед</option>
                                        <option value="">Водитель</option>
                                    </select>
                                </label>
                                <label>
                                    <span>ФИО * {checkName && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                    <input type="text" name="checkName" placeholder="Ваши данные" className="form__input" onChange={this.validation}/>
                                </label>

                                <div className="requestPage__formGroup">
                                    <label>
                                        <span>Дата рождения * {checkDate && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <input type="date" name="checkDate" placeholder="28.07.2002" className="form__input" onChange={this.validation}/>
                                    </label>
                                    <div>
                                        <p>Пол <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg></p>
                                        <label>
                                            <input type="radio" name="sex" value="мужской" defaultChecked/>
                                            <span>мужской</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="sex" value="женский" defaultChecked/>
                                            <span>женский</span>
                                        </label>
                                    </div>
                                    <label>
                                        <span>Контактный телефон * {checkPhone && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <NumberFormat name="checkPhone" format="+7 (###) ### - ####" mask="_" allowEmptyFormatting className="form__input" onChange={this.validation}/>
                                    </label>
                                    <label>
                                        <span>Электронная почта {checkMail && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <input type="email" name="checkMail" placeholder="E-mail" className="form__input" onChange={this.validation}/>
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span>Резюме {checkResume && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <textarea name="checkResume" className="form__input" onChange={this.validation}/>
                                    </label>
                                    <input type="file" className="form__input_file form__input" onChange={this.validation}/>
                                </div>

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
            </>
        )
    }
}


