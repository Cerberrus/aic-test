import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { Link }   from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import model from "~src/model/model"

//Import static files
import iconDelete from "~user/static/icons/close.svg"
import iconEdit   from "~user/static/icons/edit.svg"

export default class Coordinate extends Component {
    model = new model()

    state = {
        coordinateList: undefined,
    }

    componentDidMount() {
        this.model.getAllCoordinates()
            .then(response => {
                const coordinateList = response.coordinateList.features
                this.setState({coordinateList})
            })
    }

    onDelete = (id) => {
        this.model.deleteCoordinate(id)
            .then(() => {
                this.setState(({ coordinateList }) => {
                    const index = coordinateList.findIndex(el => el.id === id)
                    const updatedCoordinateList = [...coordinateList.slice(0, index), ...coordinateList.slice(index + 1)]

                    return {
                        coordinateList: updatedCoordinateList
                    }
                })
            })
    }

    render() {
        const { coordinateList } = this.state

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
                <Helmet title="координаты" />

                <div className="admin__header">
                    <h1 className="admin__title">Координаты</h1>
                    <Link to='/admin/coordinate/new' className="button button_yellow">Добавить</Link>
                </div>

                <ul className="admin__tableHead">
                    <li>Тип</li>
                    <li>Координаты</li>
                    <li>Название</li>
                </ul>

                <ul className="admin__tableList">
                    <AnimatePresence>
                        {coordinateList && coordinateList.map((item, index) => (
                            <motion.li
                                className="admin__tableItem"
                                variants={animationVariants}
                                initial="hidden"
                                animate="visible"
                                exit="removed"
                                custom={index}
                                key={item.id}
                            >
                                <p>{item.properties.typeTitle}</p>
                                <p>{item.geometry.coordinates[0]} | {item.geometry.coordinates[1]}</p>
                                <p>{item.title}</p>
                                <div className="admin__changeGroup">
                                    <Link to={`/admin/coordinate/${item.id}`} title="Редактировать">
                                        <svg className="admin__icon admin__icon_color_green" aria-hidden={true}>
                                            <use xlinkHref={iconEdit}/>
                                        </svg>
                                    </Link>
                                    <button
                                        className="admin__button_edit"
                                        title="Удалить"
                                        onClick={() => this.onDelete(item.id)}
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
