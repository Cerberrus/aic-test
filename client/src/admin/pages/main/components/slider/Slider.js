import React, { Component } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

// Import model
import model from "~src/model/model"

// Import static files
import iconDelete from "~src/static/icons/close.svg"
import iconEdit   from "~src/static/icons/edit.svg"

export default class Slider extends Component{
    model = new model()

    state = {
        sliderList: undefined,
    }

    componentDidMount() {
        this.model.getAllSlides()
            .then(sliderList => {
                this.setState({sliderList})
            })
    }

    onDelete = (id) => {
        this.model.deleteSlide(id)
            .then(() => {
                this.setState(({ sliderList }) => {
                    const index = sliderList.findIndex(el => el.id === id)
                    const updatedCoordinateList = [...sliderList.slice(0, index), ...sliderList.slice(index + 1)]

                    return {
                        sliderList: updatedCoordinateList
                    }
                })
            })
    }

    render(){
        const { sliderList } = this.state

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
            removed: {
                opacity: 0,
                x: 400,
                transition: {
                    delay: 0.06,
                },
            },
        }

        return(
            <>
                <div className="admin__header">
                    <h1 className="admin__title">Слайдер</h1>
                    <Link to="/admin/slider/new" className="button button_yellow">Добавить</Link>
                </div>

                <ul className="admin__tableHead">
                    <li>Фото</li>
                    <li>Название</li>
                    <li>Описание</li>
                </ul>

                <ul className="admin__tableList">
                    <AnimatePresence>
                        {sliderList && sliderList.map((slider, index) => (
                            <motion.li
                                className="admin__tableItem"
                                variants={animationVariants}
                                initial="hidden"
                                animate="visible"
                                exit="removed"
                                custom={index}
                                key={index}
                            >
                                <img src={slider.images[0]} aria-hidden={true}/>
                                <p>{slider.title}</p>
                                <p>{slider.alt}</p>
                                <div className="admin__changeGroup">
                                    <Link to={`/admin/slider/${slider.id}`} title="Редактировать">
                                        <svg className="admin__icon admin__icon_color_green" aria-hidden={true}>
                                            <use xlinkHref={iconEdit}/>
                                        </svg>
                                    </Link>
                                    <button
                                        className="admin__button_edit"
                                        title="Удалить"
                                        onClick={() => this.onDelete(slider.id)}
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
