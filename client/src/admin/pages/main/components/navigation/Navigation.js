import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Navigation.css'

export default class Navigation extends Component{

    render(){
        return(
            <aside className="sidebar">
                <nav className="navigation">
                    <ul className="navigation__item">
                        <li className="navigation__list">
                            <Link to="/admin/coordinate" className="navigation__link" >Координаты</Link>
                        </li>
                        <li className="navigation__list">
                            <Link to="/admin/request" className="navigation__link" >Запросы</Link>
                        </li>
                        <li className="navigation__list">
                            <Link to="/admin/vacancy" className="navigation__link" >Вакансии</Link>
                        </li>
                        <li className="navigation__list">
                            <Link to="/admin/slider" className="navigation__link" >Слайдер</Link>
                        </li>
                        <li className="navigation__list">
                            <Link to="/admin/setting" className="navigation__link" >Настройки</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}