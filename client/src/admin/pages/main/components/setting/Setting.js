import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Setting.css'

export default class Setting extends Component{

    render(){
        return(
            <main>
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
            <div className=" setting__group">
                <label>
                    <span>Название сайта</span>
                    <input className=" input input__name" type=" text" placeholder=" Константиновкий Констанин Алесандрович"/>
                </label>
            </div>
            <div className=" setting__group">
                <label>
                   <span>Контактый телефон *</span>
                    <input className=" input input_phone" type=" tel" placeholder="+7 ("/>
                        </label>
                    </div>
                    <div className="setting__group">
                        <label>
                            <span>Ваш Instagram аккаунт</span>
                            <input className="input" type="text" placeholder="Instagram" aria-label="Соц. сети"/>
                        </label>
                    </div>
                    <button className="setting__button button_yellow">Сохранить</button>
                    <button className="setting__button button_white" type="reset">Отменить</button>
                </form>
            </main>
        )
    }
}