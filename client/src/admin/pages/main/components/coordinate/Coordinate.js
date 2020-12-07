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
            url: 'http://localhost:3000/api/coordinate',
            withCredentials: true
        })
            .then((response)=>{
                this.setState({
                    coordinateList:response.data.coordinateList,
                    typeList:response.data.typeList
                })
                console.log(this.state)
            })
            .catch((error)=>{
                console.log('error')
            })
    }
    render(){
        const coordinateList = this.state.coordinateList.map((item, index)=>(
            <div className="coordinate__card" key={index}>
                <p className="coordinate__type">{item.type}</p>
                <p className="coordinate__cords">{item.longitude}, {item.latitude}</p>
                <p className="coordinate__designation">{item.title}</p>
                <div className="">
                    <img src="images/edit.svg" className="coordinate__img" alt=""/>
                    <img src="images/hide.svg" className="coordinate__img" alt=""/>
                    <img src="images/close.svg" className="coordinate__img" alt=""/>
                </div>
            </div>
        ))
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