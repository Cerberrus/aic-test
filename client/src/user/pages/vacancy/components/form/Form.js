import React, { Component } from "react"
import NumberFormat from "react-number-format"
import ReCAPTCHA from "react-google-recaptcha"
import Dropzone  from "react-dropzone"

// Import model
import model from "~src/model/model"

// Import static files
import "./Form.css"
import iconCheck from "~src/static/icons/check.svg"
import iconFile  from "~src/static/icons/clip.svg"

export default class Vacancy extends Component {
    model = new model()

    state = {
        vacancyList: [],
        formData: {
            vacancy:   "",
            fullName:  "",
            date:      "",
            sex:       "m",
            phone:     "",
            mail:      "",
            resume:    "",
            file:      "",
            agreement: true,
            captcha:   ""
        },
        error:         false,
    }

    componentDidMount() {
        this.model.getAllVacancies()
            .then(vacancyList => this.setState({vacancyList}))
    }

    validation = (e) => {
        const key  = e.target.name
        let value  = e.target.value
        let result = false

        const checkName   = /./
        const checkResume = /./
        const checkDate   = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d{2}$/
        const checkPhone  = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        const checkMail   = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        switch (key) {
            case "vacancy":
                result = value !== "-1"
                break
            case "fullName":
                result = checkName.test(value)
                break
            case "date":
                result = checkDate.test(value)
                break
            case "phone":
                result = checkPhone.test(value)
                break
            case "mail":
                result = checkMail.test(value)
                break
            case "resume":
                result = checkResume.test(value)
                break
            case "agreement":
                value = e.target.checked
                result = true
                break
            default:
                break
        }

        const formData = this.state.formData
        formData[key]  = result ? value : false

        this.setState({formData})
    }

    onSubmit = async (e) => {
        e.preventDefault()

        const requiredFields = ["vacancy", "fullName", "date", "phone"]
        let   error, result

        requiredFields.map((field) => {
            const input = document.querySelector(`[name=${field}]`)

            // Validation
            switch (field) {
                case "phone":
                    const checkPhone = /^(\+7[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
                    result = checkPhone.test(input.value)
                    break
                case "date":
                    const checkDate = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d{2}$/
                    result = checkDate.test(input.value)
                    break
                default:
                    result = input.value.length > 0 && input.value !== "-1"
                    break
            }

            // Show errors
            if (result === false) {
                error = true
                window.scroll({top: 0, left: 0, behavior: "smooth" })

                input.classList.add("form__input_error")
                input.insertAdjacentHTML("afterend", "<span class='form__errorText'>поле заполнено не корректно</span>")

                input.addEventListener("focus", () => {
                    input.classList.remove("form__input_error")
                    input.nextElementSibling.remove()
                })
            }
        })

        const { formData } = this.state

        if (!error && formData.agreement) {
            this.model.postFormData(formData)
                .then((response) => {
                    if (response.status === 200) {
                        this.props.onSuccess()
                    }
                })
        }
    }

    verifyCaptcha = async (response) => {
        let formData = this.state.formData
        formData.captcha = response
        this.setState({formData})
    }

    onLoadFile = (file) => {
        const value = new FormData()
        value.append("summary", file[0])

        const formData   = this.state.formData
        formData["file"] = value
        this.setState({formData})

        const fileLabel = document.querySelector(".resumeFile__text")
        fileLabel.innerHTML = file[0].name
    }

    render() {
        const { vacancyList } = this.state
        const { vacancy, fullName, date, phone, mail, resume, agreement } = this.state.formData

        const IconChecked = <svg className="form__iconCheck" aria-hidden={true}><use xlinkHref={iconCheck}/></svg>

        return (
            <form
                className="requestPage__form form"
                onSubmit={this.onSubmit}
                noValidate
            >
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
                        <NumberFormat
                            name="date"
                            type="tel"
                            format="##.##.####"
                            mask="_"
                            placeholder="28.07.2002"
                            className="form__input"
                            onChange={this.validation}
                        />
                    </label>

                    {/* Sex */}
                    <div>
                        <p>Пол {IconChecked}</p>
                        <ul className="requestPage__radioGroup form__radioGroup">
                            <li className="radioGroup__item">
                                <input
                                    type="radio"
                                    id="sex_m"
                                    name="sex"
                                    value="m"
                                    defaultChecked
                                    hidden
                                    onChange={this.validation}
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
                                    hidden
                                    onChange={this.validation}
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
                            mask="_"
                            allowEmptyFormatting
                            type="tel"
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
                            placeholder="example@mail.com"
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
                    <Dropzone
                        onDrop={this.onLoadFile}
                        accept="text/plain,
                                application/pdf,
                                application/msword,
                                application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    >
                        {({getRootProps, getInputProps}) => (
                            <div
                                {...getRootProps({
                                    title: "Выберите резюме файл",
                                    role:  "input",
                                    className: "resumeFile form__file form__input"
                                })}
                            >
                                <input
                                    {...getInputProps({
                                        multiple: false,
                                        name:    "file",
                                    })}
                                />
                                <svg className="resumeFile__icon"><use xlinkHref={iconFile}/></svg>
                                <p className="resumeFile__text">выберите или перетащите файл</p>
                            </div>
                        )}
                    </Dropzone>
                </div>

                {/* Captcha */}
                <div className="reCaptcha">
                    <p>Капча</p>
                    <div className="reCaptcha__group">
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
                        <p className={`requestPage__agreementText ${!agreement && " requestPage__agreementText_error"}`}>
                            я подтверждаю согласие на обработку персональных данных и принимаю условия рассмотрения обращений *
                        </p>
                    </label>
                </div>

                <button className="form__button button_gray">Отправить</button>
            </form>
        )
    }
}
