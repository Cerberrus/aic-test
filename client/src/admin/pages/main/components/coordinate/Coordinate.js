import React, { Component, useState } from "react"
import { Link } from "react-router-dom"
import axios    from "axios"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CoordinateItem from './CoordinateItem'
//Import static files
import './Coordinate.css'

export default class Navigation extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }

    state = {
        manage: false,
        coordinateList: [],
        toggle: false,
        typeList: [],
        coordinateModal: null
    }

    handler() {
        this.setState({
            updated: false
        })
    }

    componentDidMount() {
        this.getCoordinateList()
    }
    componentDidUpdate(prevState) {
        if (this.state.value > prevState.value) {
            this.getCoordinateList()
        }
    }

    getCoordinateList = () => {
        axios({
            method: 'get',
            url: process.env.API_BASE + '/coordinate',
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data.coordinateList)
                this.setState({
                    coordinateList: response.data.coordinateList,
                    typeList: response.data.typeList
                })
                return true
            })
            .catch((error)=>{
                console.log('error')
            })
        this.setState({updated : true})
    }
    render() {
        const { features } = this.state.coordinateList
        return(
            <section className="coordinate">
                <div className="coordinate__top">
                    <h1 className="title coordinate__title">Координаты</h1>
                    <Link to='' className="button button_yellow">Добавить</Link>
                </div>
                <div className="coordinate__tableHeader">
                    <p className="coordinate__item">Тип</p>
                    <p className="coordinate__item">Координаты</p>
                    <p className="coordinate__item">Название</p>
                </div>

                <ul>
                    {features && features.map((item) => (
                        <CoordinateItem
                            key={item.id}
                            item = {item}
                            typeList={this.state.typeList}
                            handler={this.handler}
                        />
                    ))}
                </ul>
            </section>
        )
    }
}