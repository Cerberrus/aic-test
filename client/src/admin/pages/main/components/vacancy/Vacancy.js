import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Vacancy.css'
import axios from "axios";

export default class Vacancy extends Component{

    state = {
        vacancy: []
    }

    componentDidMount() {
        this.getVacancy()
    }

    getVacancy=()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/vacancy',
            withCredentials: true
        })
            .then((response)=>{
                this.setState({
                    vacancy:response.data
                })
                console.log(response.data)
            })
            .catch((error)=>{
                console.log('error')
            })
    }
    render(){
        const vacancyList = this.state.vacancy.map((item, index)=>(
            <div className="vacancy__card" key={index}>
                <img className="vacancy__image" src="images/girl.png"/>
                <p className="vacancy__name">{item.name}</p>
                <p className="vacancy__description">{item.description}</p>
                <img src="images/close.svg"/>
                <img src="images/edit.svg"/>
                <img src="images/hide.svg"/>
            </div>
        ))
        return(
            <section className="vacancy">
                <div className="vacancy__top">
                    <h1 className="vacancy_title title">Вакансии</h1>
                    <button className="button_yellow" type="button">Добавить</button>
                </div>
                <div className="vacancy__tableHead">
                    <p>Фото</p>
                    <p>Название</p>
                    <p>Описание</p>
                </div>
                {vacancyList}
            </section>
        )
    }
}