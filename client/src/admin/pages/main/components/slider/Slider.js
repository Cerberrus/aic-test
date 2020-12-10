import React, {Component} from "react"
import {Link} from "react-router-dom";
import './Slider.css'
import axios from "axios";

export default class Slider extends Component{

    state = {
        slider: {
            list: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getSlider()
    }

    getSlider=()=>{
        axios({
            method: 'get',
            url: process.env.API_BASE + '/slider',
            withCredentials: true
        })
            .then((response)=>{
                console.log(response)
                this.setState({
                    slider:{
                        list: response.data,
                        isLoaded:true
                    }
                })
            })
            .catch((error)=>{
                console.log('error')
            })
    }

    render(){
        let sliderList= []
        if(this.state.slider.isLoaded){
            for(let slider of this.state.slider.list){
                sliderList.push(
                    <div className="slider__card">
                        <img className="slider__image" src={slider.path[0]} alt=""/>
                        <p className="slider__name">{slider.title}</p>
                        <p className="slider__description">{slider.imageDescription}</p>
                        <img src="https://aic.xutd.tk/static/icons/close.svg" alt=""/>
                        <img src="https://aic.xutd.tk/static/icons/edit.svg" alt=""/>
                        <img src="https://aic.xutd.tk/static/icons/hide.svg" alt=""/>
                    </div>
                )
            }
        }
        else{
            sliderList.push(
                <div className="slider__card">
                    <img className="slider__image" src='images/Frame%2047.png' alt=""/>
                    <p className="slider__name">Загрузка</p>
                    <p className="slider__description">Загрузка</p>
                    <img src="https://aic.xutd.tk/static/icons/close.svg" alt=""/>
                    <img src="https://aic.xutd.tk/static/icons/edit.svg" alt=""/>
                    <img src="https://aic.xutd.tk/static/icons/hide.svg" alt=""/>
                </div>
            )
        }
        return(
            <main>
                <section className="slider">
                    <div className="slider__top">
                        <h1 className="slider__title title">Слайдер</h1>
                        <button className="button_yellow" type="button">Добавить</button>
                    </div>
                    <div className="slider__tableHead">
                        <p>Фото</p>
                        <p>Название</p>
                        <p>Описание</p>
                    </div>
                    <>{sliderList}</>

                </section>
            </main>
        )
    }
}