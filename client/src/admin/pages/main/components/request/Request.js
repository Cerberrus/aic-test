import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Request.css'
import axios from "axios";

export default class Request extends Component{

    state = {
        requestList: []
    }

    componentDidMount() {
        this.getRequest()
    }

    getRequest=()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/request',
            withCredentials: true
        })
            .then((response)=>{
                this.setState({
                    requestList:response.data
                })
                console.log(response.data)
            })
            .catch((error)=>{
                console.log('error')
            })
    }

    render(){
        // const requestList = this.state.requestList.map((item, index)=>(
        //     <div className="request">
        //         <div className="request__top">
        //             <p className="request__key">Дата:<span className="request__value">{item.date}</span></p>
        //             <p className="request__key">Вакансия:<span className="request__value">{item.title}</span></p>
        //             <p className="request__key request__text_right">Статус: {item.}<span
        //                 className="request__value">Ожидание...</span></p>
        //         </div>
        //         <p className="request__key">ФИО:<span className="request__value">Иванов Иван Ивонович</span></p>
        //         <div className="request__group">
        //             <p className="request__key">Дата рождения:<span className="request__value">13/06/2000</span></p>
        //             <p className="request__key">Телефон:<a className="request__value" href="tel:+79619999999">+7
        //                 (961) 999-99-99</a></p>
        //             <p className="request__key">Пол:<span className="request__value">Муж</span></p>
        //             <p className="request__key">E-mail:<a className="request__value"
        //                                                   href="mailto:aurora@mail.ru">aurora@mail.ru</a></p>
        //         </div>
        //         <div className="request__group">
        //             <p className="request__key request__key_resume">Резюме:</p>
        //             <p className="request__value">Lorem ipsum dolor sit amet, consectetur
        //                 adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla
        //                 urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel
        //                 fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim
        //                 lobortis scelerisque fermentum dui faucibus in ornare quam viverra
        //             </p>
        //         </div>
        //         <div className="request__group">
        //             <p className="request__key">Резюме (файл):
        //                 <a href="#" download className="request__download">Скачать <img
        //                     src="images/download.svg"/></a>
        //             </p>
        //         </div>
        //     </div>
        // ))
        return(
            <section>
                <h1 className="title">Запросы</h1>

                <div className="request__status">
                    <p className="request__item">Ожидание...</p>
                    <p className="request__item request__item_green">Принято</p>
                    <p className="request__item request__item_red">Отклонено</p>
                </div>
            </section>
        )
    }
}