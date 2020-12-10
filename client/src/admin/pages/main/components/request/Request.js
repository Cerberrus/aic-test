import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Request.css'
import axios from "axios";

export default class Request extends Component{

    state = {
        request: {
            list: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getRequest()
    }

    getRequest=()=>{
        axios({
            method: 'get',
            url: process.env.API_BASE+'/request',
            withCredentials: true
        })
            .then((response)=>{
                this.setState({
                    request:{
                        list: response.data,
                        isLoaded: true
                    }
                })
                console.log(response.data)
            })
            .catch((error)=>{
                console.log('error')
            })
    }

    render(){
        let requestList =[]
        if(this.state.request.isLoaded){
            for(let request of this.state.request.list){
                requestList.push(
                    <div className="request" key={request.id}>
                        <div className="request__top">
                            <p className="request__key">Дата:<span className="request__value">{request.date}</span></p>
                            <p className="request__key">Вакансия:<span className="request__value">{request.title}</span></p>
                            <p className="request__key request__text_right">Статус: {request.date}<span
                                className="request__value">{request.status}</span></p>
                        </div>
                        <p className="request__key">ФИО:<span className="request__value">{request.name}</span></p>
                        <div className="request__group">
                            <p className="request__key">Дата рождения:<span className="request__value">{request.happy_date}</span></p>
                            <p className="request__key">Телефон:<a className="request__value" href="tel:+79619999999">{request.phone_number}</a></p>
                            <p className="request__key">Пол:<span className="request__value">{request.sex = 'm'?"Муж.":"Жен."}</span></p>
                            <p className="request__key">E-mail:<a className="request__value"
                                                                  href={`mailto:${request.email}`}>{request.email}</a></p>
                        </div>
                        <div className="request__group">
                            <p className="request__key request__key_resume">Резюме:</p>
                            <p className="request__value">{request.resumeText}</p>
                        </div>
                        {('path' in request)
                            ? <div className="request__group">
                                <p className="request__key">Резюме (файл):
                                    <a href="#" download className="request__download">Скачать <img
                                        src={request.path}/></a>
                                </p>
                            </div>
                            : <></>
                        }
                    </div>
                )
            }
        }
        return(
            <section>
                <h1 className="title">Запросы</h1>
                {requestList}
                <div className="request__status">
                    <p className="request__item">Ожидание...</p>
                    <p className="request__item request__item_green">Принято</p>
                    <p className="request__item request__item_red">Отклонено</p>
                </div>
            </section>
        )
    }
}