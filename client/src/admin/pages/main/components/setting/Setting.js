import React, { Component } from "react"
import { Link } from "react-router-dom"

// Import static files
import './Setting.css'

export default class Setting extends Component {
    state = {

    }

    render(){
        return(
            <>
                <form className="setting">
                    <h1 className="title">Настройки</h1>
                    <div className="setting__group">
                        <p>Логотип</p>
                        <div className="setting__group">
                            <label className="input__label">
                                <img src=" image/iconmonstr-paperclip-1%201.svg" className=" form__img" alt=""/>
                                выберете или перетащите файл
                                <input type=" file" className=" input__file"/>
                            </label>
                        </div>
                    </div>

                    <label>
                        <span>Контактый телефон *</span>
                        <input
                            className="form__input"
                            type=" tel"
                            placeholder="+7 ("
                            name=""
                        />
                    </label>

                    <label>
                        <span>Ваш Instagram аккаунт</span>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Instagram"
                            name=""
                        />
                    </label>

                    <button className="setting__button button_yellow">Сохранить</button>
                    <Link to="/admin/coordinate" className="setting__button button button_gray">Отменить</Link>
                </form>
            </>
        )
    }
}
