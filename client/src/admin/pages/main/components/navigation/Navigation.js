import React, { Component } from "react"
import { NavLink } from "react-router-dom"

// Import static files
import './Navigation.css'

export default class Navigation extends Component {

    render(){
        return(
            <aside>
                <nav className="navigation">
                    <ul className="navigation__item">
                        <li className="navigation__list">
                            <NavLink to="/admin/coordinate" className="navigation__link" >Координаты</NavLink>
                        </li>
                        <li className="navigation__list">
                            <NavLink to="/admin/request"    className="navigation__link" >Запросы</NavLink>
                        </li>
                        <li className="navigation__list">
                            <NavLink to="/admin/vacancy"    className="navigation__link" >Вакансии</NavLink>
                        </li>
                        <li className="navigation__list">
                            <NavLink to="/admin/slider"     className="navigation__link" >Слайдер</NavLink>
                        </li>
                        <li className="navigation__list">
                            <NavLink to="/admin/setting"    className="navigation__link" >Настройки</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}
