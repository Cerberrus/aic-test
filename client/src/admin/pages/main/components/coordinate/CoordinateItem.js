import React, { Component } from "react"
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {Link} from "react-router-dom";
import './ManageCoordinate.css'
import './Coordinate.css'
import axios from "axios";


export default class CoordinateItem extends Component{
    state ={
        open: false,
        item:{
            id: this.props.item.id,
            title: this.props.item.title,
            longitude: this.props.item.geometry.coordinates[0],
            latitude: this.props.item.geometry.coordinates[1],
            typeId: this.props.item.properties.type,
            typeTitle:this.props.item.properties.typeTitle,
        },
        typeList: this.props.typeList,
    }
    closeModal = () => {
        this.setState(
            {
                open: false,
                item:{
                    id: this.props.item.id,
                    title: this.props.item.title,
                    longitude: this.props.item.geometry.coordinates[0],
                    latitude: this.props.item.geometry.coordinates[1],
                    typeId: this.props.item.properties.type,
                    typeTitle:this.props.item.properties.typeTitle,
                }
            }
            )
    }

    openModal = () => {
        this.setState({open: true})
    }

    changeTitle=(e)=> {
        const newItemState = this.state.item
        newItemState.title = e.target.value
        this.setState({
            item:newItemState
        })
    }
    changeLongitude=(e)=> {
        const newItemState = this.state.item
        newItemState.longitude = e.target.value
        this.setState({
            item:newItemState
        })
    }
    changeLatitude=(e)=> {
        const newItemState = this.state.item
        newItemState.latitude = e.target.value
        this.setState({
            item:newItemState
        })
    }
    changeType=(e)=>{
        const newItemState = this.state.item
        newItemState.typeId = e.target.id
        this.setState({
             item:newItemState
         })
    }

    updateCoordinate() {
        const {id, title, longitude, latitude, typeId} = this.state.item
        console.log(id, title, longitude, latitude, typeId)
        axios({
            method: 'put',
            url: process.env.API_BASE + `/coordinate/${id}?`+
            `title=${title}`+
            `&longitude=${longitude}`+
            `&latitude=${latitude}`+
            `&typeId=${typeId}`,
            withCredentials: true
        })
            .then((response) => {
                console.log('Successfull')
            })
            .catch((error) => {
                console.log('error')
            })
    }
    sendChange=async (e)=>{
        e.preventDefault()
        await this.updateCoordinate()
        this.closeModal()
        this.props.handler()
    }

    ControlledPopup = () => {
        const {title, longitude, latitude, typeId} = this.state.item
        const {typeList} = this.state
        return (
            <div>
                <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
                    <section className="coordinateAdd">
                        <h1 className="title">Вакансия</h1>
                        <form className="form__vacancy">
                            <p className="coordinateAdd__text">Тип</p>
                            <div className="groupRadio">
                                {typeList.map((value, index) => {
                                    return <label className="radio" key={index}>
                                        <input className="input__radio" type="radio" name="selection" id={value.id} defaultChecked={value.id === typeId} onChange={this.changeType}/>
                                        <span>{value.type}</span>
                                    </label>
                                })}
                            </div>
                            <div className="coordinateAdd__group">
                                <label>
                                    <span>Долгота</span>
                                    <input type="number" step="any" className="input"
                                           placeholder={`00.000`}
                                            value={longitude}
                                           onChange={this.changeLongitude}
                                    />
                                </label>
                                <label>
                                    <span>Ширина</span>
                                    <input type="number" step="any" className="input"
                                           placeholder={`00.000`}
                                           value={latitude}
                                           onChange={this.changeLatitude}
                                    />
                                </label>
                            </div>
                            <div className="coordinateAdd__group">
                                <label>
                                    <span>Название</span>
                                    <textarea placeholder={`Введите...`} defaultValue={title} onChange={this.changeTitle}/>
                                </label>
                            </div>
                            <input type='button' className="coordinateAdd__button button_yellow" onClick={this.sendChange} value='Сохранить'/>
                            <button className="coordinateAdd__button button_white" onClick={this.closeModal}>Отменить</button>
                        </form>
                    </section>
                </Popup>
            </div>
        );
    };
    render() {
        const {title, longitude, latitude, typeId, typeTitle} = this.state.item
       return <li className="coordinate__card">
           <p className="coordinate__type">{typeTitle}</p>
           <p className="coordinate__cords">{longitude} | {latitude}</p>
           <p className="coordinate__designation">{title}</p>
           <ul className="coordinate__cardList">
               <li>
                   {this.ControlledPopup()}
                   <button title="Редактировать" onClick={this.openModal}>
                       <img src="https://aic.xutd.tk/static/icons/edit.svg"  className="coordinate__img" alt=""/>
                   </button>
               </li>
               <li>
                   <button title="Удалить">
                       <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                   </button>
               </li>
           </ul>
       </li>
    }
}