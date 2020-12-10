import React, {Component} from "react"

import './Coordinate.css'
import axios from "axios";

export default class Navigation extends Component{

    state = {
        coordinateList: [],
        typeList: []
    }

    componentDidMount() {
        this.getCoordinate()
    }

    getCoordinate=()=>{
        axios({
            method: 'get',
            url: process.env.API_BASE + '/coordinate',
            withCredentials: true
        })
            .then((response)=>{
                console.log(response)
                this.setState({
                    coordinateList:response.data.coordinateList,
                    typeList:response.data.typeList
                })
            })
            .catch((error)=>{
                console.log('error')
            })
    }
    render(){
        let coordinateList
        if('features' in this.state.coordinateList){
            coordinateList = this.state.coordinateList.features.map((item)=>(
                <div className="coordinate__card" key={item.id}>
                    <p className="coordinate__type">{item.properties.typeTitle}</p>
                    <p className="coordinate__cords">{item.geometry.coordinates[0]} | {item.geometry.coordinates[1]}</p>
                    <p className="coordinate__designation">{item.title}</p>
                    <div className="">
                        <img src="https://aic.xutd.tk/static/icons/edit.svg" className="coordinate__img" alt=""/>
                        <img src="https://aic.xutd.tk/static/icons/hide.svg" className="coordinate__img" alt=""/>
                        <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                    </div>
                </div>
            ))
        }
        else {
            coordinateList = <div className="coordinate__card">
                <p className="coordinate__type">Загрузка</p>
                <p className="coordinate__cords">Загрузка</p>
                <p className="coordinate__designation">Загрузка</p>
                <div className="">
                    <img src="https://aic.xutd.tk/static/icons/edit.svg" className="coordinate__img" alt=""/>
                    <img src="https://aic.xutd.tk/static/icons/hide.svg" className="coordinate__img" alt=""/>
                    <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                </div>
            </div>
        }

        return(
            <section className="coordinate">
                <div className="coordinate__top">
                    <h1 className="title coordinate__title">Координаты</h1>
                    <button className="button_yellow">Добавить</button>
                </div>
                <div className="coordinate__tableHeader">
                    <p className="coordinate__item">Тип</p>
                    <p className="coordinate__item">Координаты</p>
                    <p className="coordinate__item">Название</p>
                </div>
                <div>
                    {coordinateList}
                </div>
            </section>
        )
    }
}