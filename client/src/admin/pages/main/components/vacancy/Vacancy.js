import React, { Component } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

// Import model
import model from "~src/model/model"

// Import static files
import iconDelete from "~src/static/icons/close.svg"
import iconEdit   from "~src/static/icons/edit.svg"

export default class Vacancy extends Component {
    model = new model()

    state = {
        vacancyList: undefined,
    }

    componentDidMount() {
        this.model.getAllVacancies()
            .then(vacancyList => {
                this.setState({vacancyList})
            })
    }

    onDelete = (id) => {
        this.model.deleteVacancy(id)
            .then(() => {
                this.setState(({ vacancyList }) => {
                    const index = vacancyList.findIndex(el => el.id === id)
                    const updatedVacancyList = [...vacancyList.slice(0, index), ...vacancyList.slice(index + 1)]

                    return {
                        vacancyList: updatedVacancyList
                    }
                })
            })
    }

    render() {
        const { vacancyList } = this.state

        const animationVariants = {
            hidden: (index) => ({
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
            removed: {
                opacity: 0,
                x: 400,
                transition: {
                    delay: 0.06,
                },
            },
        }

        return (
            <>
                <div className="admin__header">
                    <h1 className="admin__title">Вакансии</h1>
                    <Link to="/admin/vacancy/new" className="button button_yellow">Добавить</Link>
                </div>

                <ul className="admin__tableHead">
                    <li>Фото</li>
                    <li>Название</li>
                    <li>Описание</li>
                </ul>

                <ul className="admin__tableList">
                    <AnimatePresence>
                        {vacancyList && vacancyList.map((vacancy, index) => (
                            <motion.li
                                className="admin__tableItem"
                                variants={animationVariants}
                                initial="hidden"
                                animate="visible"
                                exit="removed"
                                custom={index}
                                key={vacancy.id}
                            >
                                <img src={vacancy.images[0]} alt={vacancy.alt}/>
                                <p>{vacancy.title}</p>
                                <p>{vacancy.description}</p>

                                <div className="admin__changeGroup">
                                    <Link to={`/admin/vacancy/${vacancy.id}`} title="Редактировать">
                                        <svg className="admin__icon admin__icon_color_green" aria-hidden={true}>
                                            <use xlinkHref={iconEdit}/>
                                        </svg>
                                    </Link>
                                    <button
                                        className="admin__button_edit"
                                        title="Удалить"
                                        onClick={() => this.onDelete(vacancy.id)}
                                    >
                                        <svg className="admin__icon admin__icon_color_red" aria-hidden={true}>
                                            <use xlinkHref={iconDelete}/>
                                        </svg>
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </>
        )
    }
}
