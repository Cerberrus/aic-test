import React, {Component} from "react"
import Helmet from "react-helmet"
import NumberFormat from 'react-number-format'
import axios from "axios"
import { motion } from "framer-motion"

import Success from "./components/success/Success"
import ReCAPTCHA from "react-google-recaptcha"

// Import static files
import './Form.css'
import iconCheck from '~user/static/icons/check.svg'
import iconFile from '~user/static/icons/clip.svg'

export default class Form extends Component {
    state = {
        vacancyList: [],
        formData: {
            vacancy:   '',
            fullName:  '',
            date:      '',
            sex:       'm',
            phone:     '',
            mail:      '',
            resume:    '',
            file:      '',
            agreement: true,
            captcha:   ''
        },
        error:         false,
        success:       false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.getVacancy()
    }

    getVacancy = async () => {
        const response = await axios({
            method: 'get',
            url: `http://192.168.0.200:3000/api/vacancy`
        })

        this.setState({
            vacancyList: response.data
        })
    }

    validation = (e) => {
        const key  = e.target.name
        let value  = e.target.value
        let result = false

        const checkName   = /./
        const checkResume = /./
        const checkDate   = /^(\d{4})[\s.\/-](\d{2})[\s.\/-](\d{2})$/
        const checkPhone  = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        const checkMail   = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        switch (key) {
            case 'vacancy':
                result = value !== '-1'
                break
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
                result = true
                break
            case 'agreement':
                value = e.target.checked
                result = true
                break
            default:
                break
        }

        let formData  = this.state.formData
        formData[key] = result ? value : false

        this.setState({formData})
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const { vacancy, fullName, date, sex, phone, mail, resume, file, captcha, agreement } = this.state.formData

        const requiredFields = ['vacancy', 'fullName', 'date', 'phone']
        let   error, result

        requiredFields.map((field) => {
           const input = document.querySelector(`[name=${field}]`)

            switch (field) {
               case 'phone':
                   const checkPhone = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
                   result = checkPhone.test(input.value)
                   break
               default:
                   result = input.value.length > 0 && input.value !== '-1'
                   break
            }

            if (result === false) {
                error = true

                input.classList.add('form__input_error')
                input.insertAdjacentHTML('afterend', '<span class="form__errorText">поле заполнено не корректно</span>');

                input.addEventListener('focus', () => {
                    input.classList.remove('form__input_error')
                    input.nextElementSibling.remove()
                })
            }
        })

        if (!error && agreement) {
            axios({
                method: 'post',
                headers: {
                    'Content-Type': file ? 'multipart/form-data' : 'application/json'
                },
                url: `http://192.168.0.200:3000/api/request?`+
                     `g-recaptcha-response=${captcha}&`+
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
                this.setState({
                    success: true
                })
            }).catch((error)=>{
                console.log(error.response)
                alert('Ошибка!')
            })
        }
    }

    verifyCaptcha = async (response) => {
        let formData  = this.state.formData
        formData.captcha = response

        this.setState({formData})
    }

    onLoadFile = (e) => {
        this.validation(e)

        const fileLabel = e.target.labels[0].querySelector('.resumeFile__text')
        fileLabel.innerHTML = e.target.files[0].name
    }

    render() {
        const { vacancyList } = this.state
        const { success } = this.state
        const { vacancy, fullName, date, phone, mail, resume } = this.state.formData

        const IconChecked = <svg className="form__iconCheck" aria-hidden={true}><use xlinkHref={iconCheck}/></svg>

        const Form = (
            <>
                <h1 className="visuallyHidden">Форма заявки</h1>
                <p className="requestPage__title">Работа твоей мечты</p>

                <div className="requestPage__content">
                    {/* Form */}
                    <form className="requestPage__form form" onSubmit={this.onSubmit} noValidate>
                        {/* Vacancy */}
                        <label>
                            <span>Вакансия * {vacancy && IconChecked}</span>
                            <select
                                name="vacancy"
                                className="form__select form__input"
                                onChange={this.validation}
                            >
                                <option value={-1} defaultValue>Выберите вакансию</option>
                                {vacancyList.map((vacancy, index) => (
                                    <option key={index} value={vacancy.id}>
                                        {vacancy.title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Full name */}
                        <label>
                            <span>ФИО * {fullName && IconChecked}</span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Ваши данные"
                                className="form__input"
                                onChange={this.validation}
                            />
                        </label>

                        {/* Date, sex, phone, mail */}
                        <div className="requestPage__formGroup">
                            {/* Date */}
                            <label>
                                <span>Дата рождения * {date && IconChecked}</span>
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="28.07.2002"
                                    className="form__input"
                                    onChange={this.validation}
                                />
                            </label>

                            {/* Sex */}
                            <div>
                                <p>Пол {IconChecked}</p>
                                <ul className="form__radioGroup">
                                    <li className="radioGroup__item">
                                        <input
                                            type="radio"
                                            id="sex_m"
                                            name="sex"
                                            value="m"
                                            onChange={this.validation}
                                            defaultChecked
                                            hidden
                                        />
                                        <label className="radioGroup__radio form__radio" htmlFor="sex_m">
                                            <span>мужской</span>
                                        </label>
                                    </li>
                                    <li className="radioGroup__item">
                                        <input
                                            type="radio"
                                            id="sex_f"
                                            name="sex"
                                            value="f"
                                            hidden onChange={this.validation}
                                        />
                                        <label className="radioGroup__radio form__radio" htmlFor="sex_f">
                                            <span>женский</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            {/* Phone */}
                            <label>
                                <span>Контактный телефон * {phone && IconChecked}</span>
                                <NumberFormat
                                    name="phone"
                                    format="+7 (###) ### - ####"
                                    mask="_" allowEmptyFormatting
                                    className="form__input"
                                    onChange={this.validation}
                                />
                            </label>

                            {/* Mail */}
                            <label>
                                <span>Электронная почта {mail && IconChecked}</span>
                                <input
                                    type="email"
                                    name="mail"
                                    placeholder="E-mail"
                                    className="form__input"
                                    onChange={this.validation}
                                />
                            </label>
                        </div>

                        {/* Resume, resume file */}
                        <div>
                            {/* Resume */}
                            <label>
                                <span>Резюме {resume && IconChecked}</span>
                                <textarea
                                    name="resume"
                                    className="requestPage__resume form__input"
                                    onChange={this.validation}
                                />
                            </label>

                            {/* Resume file */}
                            <div>
                                <input
                                    type="file"
                                    id="resume_file"
                                    name="file"
                                    onChange={this.onLoadFile}
                                    hidden
                                />
                                <label htmlFor="resume_file" className="resumeFile form__file form__input">
                                    <svg className="resumeFile__icon"><use xlinkHref={iconFile}/></svg>
                                    <p className="resumeFile__text">выберете или перетащите файл</p>
                                </label>
                            </div>
                        </div>

                        {/* Captcha */}
                        <div>
                            <p>Капча</p>
                            <div className="reCaptcha">
                                <ReCAPTCHA
                                    sitekey="6LfOQ-4ZAAAAACOFvjKDgtEwPjLqX3CdCPgTbTpL"
                                    onChange={this.verifyCaptcha}
                                    className="reCaptcha__block"
                                />
                                <span className="reCaptcha__info">* поля для обязательного заполнения</span>
                            </div>
                        </div>

                        {/* Agreement */}
                        <div>
                            <input
                                type="checkbox"
                                name="agreement"
                                id="agreement2"
                                onChange={this.validation}
                                hidden
                                defaultChecked/>
                            <label className="requestPage__agreement form__checkbox" htmlFor="agreement2">
                                <span>я подтверждаю согласие на обработку персональных<br/>данных и принимаю условия рассмотрения обращений *</span>
                            </label>
                        </div>

                        <button className="form__button button_gray">Отправить</button>
                    </form>

                    {/* Goal section */}
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
            </>
        )

        return (
            <>
                <Helmet>
                    <title>анкета</title>
                    <meta name="description" content="Form page" />
                </Helmet>

                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{  opacity: 0 }}
                    transition={{delay: 0.2}}
                    className="requestPage container"
                >
                    {success ? <Success /> : Form}
                </motion.main>
            </>
        )
    }
}
