import React, { Component } from "react"
import Helmet  from "react-helmet"
import NumberFormat from 'react-number-format'
import axios from "axios"

import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"
import ReCAPTCHA from "react-google-recaptcha"

// Import static files
import './Form.css'
import iconCheck from '~user/static/icons/check.svg'


export default class Form extends Component {
    state = {
        vacancyList: [],
        formData: {
            vacancy:  '',
            fullName: '',
            date:     '',
            sex:      'm',
            phone:    '',
            mail:     '',
            resume:   '',
            file:     '',
        },
        error:        false,
        verify:        ''
    }

    componentDidMount() {
        this.getVacancy()
    }

    getVacancy = async () => {
        const response = await axios({
            method: 'get',
            url: `http://192.168.0.200:3000/api/job-vacancy`
        })

        this.setState({
            vacancyList: response.data
        })
    }

    validation = async (e) => {
        const key  = e.target.name
        let value  = e.target.value
        let result = true

        const checkName   = /./
        const checkResume = /./
        const checkDate   = /^(\d{4})[\s\.\/-](\d{2})[\s\.\/-](\d{2})$/
        const checkPhone  = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        const checkMail   = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        switch (key) {
            case 'fullName':
                result = checkName.test(value)
                break
            case 'date':
                result = checkDate.test(value)
                break
            case 'phone':
                result = checkPhone.test(value)
                break
            case 'mail':
                result = checkMail.test(value)
                break
            case 'resume':
                result = checkResume.test(value)
                break
            case 'file':
                value = new FormData()
                value.append('summary', e.target.files[0])
                break
            default:
                break
        }

        let formData  = this.state.formData
        formData[key] = result ? value : null

        if (result) {
            this.setState({
                formData: {
                    ...formData
                }
            })
        }
    }

    submit = async (e) => {
        e.preventDefault()
        const { vacancy, fullName, date, sex, phone, mail, resume, file } = this.state.formData
        const { verify } = this.state

        axios({
            method: 'post',
            headers: {
                'Content-Type': file ? 'multipart/form-data' : 'application/json'
            },
            url: `http://192.168.0.200:3000/api/job-request?`+
                 `g-recaptcha-response=${verify}&`+
                 `jobVacancyId=${vacancy}&`+
                 `name=${fullName}&`+
                 `happyDate=${date}&`+
                 `phoneNumber=${phone}&`+
                 `${sex && 'sex='+sex+'&'}`+
                 `${mail && 'email='+mail+'&'}`+
                 `${resume && 'resumeText='+resume+'&'}`
            ,
            data: file
        }).then((response)=>{
            console.log(response)
            alert('Успех!')
            // Redirect to successful page
        }).catch((error)=>{
            console.log(error.response.data)
            alert('Ошибка!')
        })
    }

    verifyCallback = async (response)=> {
        this.setState({
            verify: response
        })
    };

    render() {
        const { vacancyList } = this.state
        const { vacancy, fullName, date, phone, mail, resume } = this.state.formData
        console.log(this.state.formData.file);

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
                                    <span>Вакансия * {vacancy && <svg className="form__iconCheck"><use xlinkHref={iconCheck}/></svg>}</span>
                                    <select name="vacancy" className="form__select form__input" onChange={this.validation} >
                                        <option defaultValue>Выберите вакансию</option>
                                        {vacancyList.map((vacancy, index) => (
                                            <option key={index} value={vacancy.id}>{vacancy.name}</option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    <span>ФИО * {fullName && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                    <input type="text" name="fullName" placeholder="Ваши данные" className="form__input" onChange={this.validation}/>
                                </label>

                                <div className="requestPage__formGroup">
                                    <label>
                                        <span>Дата рождения * {date && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <input type="date" name="date" placeholder="28.07.2002" className="form__input" onChange={this.validation}/>
                                    </label>
                                    <div>
                                        <p>Пол <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg></p>
                                        <ul className="form__radioGroup">
                                            <li className="radioGroup__item">
                                                <input type="radio" id="sex_m" name="sex" value="m" hidden onChange={this.validation} defaultChecked/>
                                                <label className="radioGroup__radio form__radio" htmlFor="sex_m">
                                                    <span>мужской</span>
                                                </label>
                                            </li>
                                            <li className="radioGroup__item">
                                                <input type="radio" id="sex_f" name="sex" value="f" hidden onChange={this.validation}/>
                                                <label className="radioGroup__radio form__radio" htmlFor="sex_f">
                                                    <span>женский</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <label>
                                        <span>Контактный телефон * {phone && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <NumberFormat name="phone" format="+7 (###) ### - ####" mask="_" allowEmptyFormatting className="form__input" onChange={this.validation}/>
                                    </label>
                                    <label>
                                        <span>Электронная почта {mail && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <input type="email" name="mail" placeholder="E-mail" className="form__input" onChange={this.validation}/>
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span>Резюме {resume && <svg className="form__iconCheck"><use xlinkHref={iconCheck} /></svg>}</span>
                                        <textarea name="resume" className="requestPage__resume form__input" onChange={this.validation}/>
                                    </label>
                                    <input type="file" name="file" className="requestPage__file form__input" onChange={this.validation}/>
                                </div>

                                <div>
                                    <p>Капча</p>
                                    <div className="reCaptcha">
                                        <ReCAPTCHA
                                            sitekey="6LfOQ-4ZAAAAACOFvjKDgtEwPjLqX3CdCPgTbTpL"
                                            onChange={this.verifyCallback}
                                            className="reCaptcha__block"
                                        />
                                        <span className="reCaptcha__info">* поля для обязательного заполнения</span>
                                    </div>
                                </div>

                                <input type="checkbox" id="agreement2" hidden defaultChecked/>
                                <label className="requestPage__agreement form__checkbox" htmlFor="agreement2">
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
