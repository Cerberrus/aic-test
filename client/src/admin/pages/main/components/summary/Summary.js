import React, { Component } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link }   from  "react-router-dom"
import { Helmet } from "react-helmet"

import model from "~src/model/model"

// Import static files
import './Summary.css'
import iconDownload from '~user/static/icons/download.svg'

export default class Summary extends Component {
    model = new model()

    state = {
        summaryList: undefined,
        statusList:  undefined,
        loading: true
    }

    componentDidMount() {
        this.model.getSummary()
            .then((response) => {
                this.setState({
                    summaryList: response.summaryList,
                    statusList:  response.statusList
                })
            })
    }

    onToggleStatus = (e) => {
        const summary = {
            id:    e.target.name,
            statusID: e.target.value,
        }

        this.model.putSummaryStatus(summary)
    }

    render() {
        const { summaryList, statusList } = this.state

        const animationVariants = {
            hidden: () => ({
                opacity: 0,
                scale: 0.8,
            }),
            visible: (index) => ({
                opacity: 1,
                scale: 1,
                transition: {
                    delay: (index + 1) * 0.03,
                },
            }),
        }

        return (
            <>
                <Helmet title="заявки"/>
                <div className="admin__header">
                    <h1 className="admin__title">Заявки</h1>
                </div>

                <ul className="admin__tableList">
                    <AnimatePresence>
                        {summaryList && summaryList.map((summary, index) => (
                            <motion.li
                                className="request__item"
                                variants={animationVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                key={index}
                            >
                                <div className="request__group">
                                    <p className="request__key">
                                        Дата:
                                        <span className="request__value">{summary.date}</span>
                                    </p>
                                    <p className="request__key">
                                        Вакансия:
                                        <span className="request__value">{summary.vacancy}</span>
                                    </p>
                                    <label className="request__key request__key_right">
                                        Статус:
                                        <select
                                            name={summary.id}
                                            className="request__select form__select form__input"
                                            onChange={this.onToggleStatus}
                                            defaultValue={summary.statusId}
                                        >
                                            {statusList.map((status) => (
                                                <option
                                                    key={status.id}
                                                    value={status.id}
                                                >
                                                    {status.title}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="request__group">
                                    <p className="request__key">
                                        ФИО:
                                        <span className="request__value">{summary.name}</span>
                                    </p>
                                </div>

                                <div className="request__group">
                                    <p className="request__key">
                                        Дата рождения:
                                        <span className="request__value">{summary.dateBirth}</span>
                                    </p>
                                    {summary.phone && (
                                        <p className="request__key">Телефон:
                                            <a className="request__link request__value" href={`tel:${summary.phone}`}>
                                                {summary.phone}
                                            </a>
                                        </p>
                                    )}
                                    <p className="request__key">
                                        Пол:
                                        <span className="request__value">
                                            {summary.sex = 'm' ? "Муж." : "Жен."}
                                        </span>
                                    </p>
                                    {summary.mail && (
                                        <p className="request__key">
                                            E-mail:
                                            <a className="request__link request__value"href={`mailto:${summary.mail}`}>
                                                {summary.mail}
                                            </a>
                                        </p>
                                    )}
                                </div>

                                <div className="request__group">
                                    <p className="request__key">
                                        Резюме:
                                        <span className="request__value">{summary.resume}</span>
                                    </p>
                                </div>

                                {summary.file &&
                                    <div className="request__group">
                                        <p className="request__key">Резюме (файл):
                                            <a
                                               href={summary.file[0]}
                                               className="request__link request__value"
                                               download
                                            >
                                                Скачать
                                                <svg className="request__icon"><use xlinkHref={iconDownload}/></svg>
                                            </a>
                                        </p>
                                    </div>
                                }
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </>
        )
    }
}
