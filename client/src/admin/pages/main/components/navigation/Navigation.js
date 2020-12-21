import React  from "react"
import { NavLink } from "react-router-dom"

// Import static files
import "./Navigation.css"

const Navigation = () => (
    <aside>
        <nav className="navigation">
            <ul className="navigation__item">
                <li className="navigation__list">
                    <NavLink exact to="/admin"      className="navigation__link" >Настройки</NavLink>
                </li>
                <li className="navigation__list">
                    <NavLink to="/admin/coordinate" className="navigation__link" >Координаты</NavLink>
                </li>
                <li className="navigation__list">
                    <NavLink to="/admin/request"    className="navigation__link" >Заявки</NavLink>
                </li>
                <li className="navigation__list">
                    <NavLink to="/admin/vacancy"    className="navigation__link" >Вакансии</NavLink>
                </li>
                <li className="navigation__list">
                    <NavLink to="/admin/slider"     className="navigation__link" >Слайдер</NavLink>
                </li>
            </ul>
        </nav>
    </aside>
)

export default Navigation
