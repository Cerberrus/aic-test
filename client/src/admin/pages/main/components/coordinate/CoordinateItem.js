import React, { Component } from "react"
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import {Link} from "react-router-dom";
//import './ManageCoordinate.css'


export default class CoordinatePopup extends Component{

    render() {
       return <li className="coordinate__card" key={this.props.id}>
           <p className="coordinate__type">{this.props.properties.typeTitle}</p>
           <p className="coordinate__cords">{this.props.geometry.coordinates[0]} | {this.props.geometry.coordinates[1]}</p>
           <p className="coordinate__designation">{this.props.title}</p>
           <ul className="coordinate__cardList">
               <li>
                   <Link to="" title="Редактировать" >
                       <img src="https://aic.xutd.tk/static/icons/edit.svg"  className="coordinate__img" alt=""/>
                   </Link>
               </li>
               <li>
                   <button title="Удалить">
                       <img src="https://aic.xutd.tk/static/icons/close.svg" className="coordinate__img" alt=""/>
                   </button>
               </li>
           </ul>
       </li>
       //  <Popup trigger={
       //     <button title="Редактировать">
       //         <img src="https://aic.xutd.tk/static/icons/edit.svg" className="coordinate__img" alt=""/>
       //     </button>
       // } position="right center">
       //     <section className="coordinateAdd">
       //         <h1 className="title">Вакансия</h1>
       //         <form className="form__vacancy">
       //             <p className="coordinateAdd__text">Тип</p>
       //             <div className="groupRadio">
       //                 <label className="radio">
       //                     <input className="input__radio" type="radio" name="selection" defaultChecked/>
       //                     <span>Юр.Лицо</span>
       //                 </label>
       //                 <label className="radio">
       //                     <input className="input__radio" type="radio" name="selection" defaultChecked/>
       //                     <span>Физ.Лицо</span>
       //                 </label>
       //             </div>
       //             <div className="coordinateAdd__group">
       //                 <label>
       //                     <span>Долгота</span>
       //                     <input type="text" className="input"
       //                            placeholder={`00.000`}/>
       //                 </label>
       //                 <label>
       //                     <span>Ширина</span>
       //                     <input type="text" className="input"
       //                            placeholder={this.props.coordinate.geometry.coordinates[1] || `00.000`}/>
       //                 </label>
       //             </div>
       //             <div className="coordinateAdd__group">
       //                 <label>
       //                     <span>Название</span>
       //                     <textarea placeholder={`Введите...`}/>
       //                 </label>
       //             </div>
       //             <button className="coordinateAdd__button button_yellow" >Сохранить
       //             </button>
       //             <button className="coordinateAdd__button button_white" type="button" onClick={close()}>Отменить</button>
       //         </form>
       //     </section>
       // </Popup>



        // <section className="coordinateAdd">
        //     <h1 className="title">Вакансия</h1>
        //     <form className="form__vacancy">
        //         <p className="coordinateAdd__text">Тип</p>
        //         <div className="groupRadio">
        //             <label className="radio">
        //                 <input className="input__radio" type="radio" name="selection" defaultChecked/>
        //                 <span>Юр.Лицо</span>
        //             </label>
        //             <label className="radio">
        //                 <input className="input__radio" type="radio" name="selection" defaultChecked/>
        //                 <span>Физ.Лицо</span>
        //             </label>
        //         </div>
        //         <div className="coordinateAdd__group">
        //             <label>
        //                 <span>Долгота</span>
        //                 <input type="text" className="input"
        //                        placeholder={`00.000`}/>
        //             </label>
        //             <label>
        //                 <span>Ширина</span>
        //                 <input type="text" className="input"
        //                        placeholder={this.props.coordinate.geometry.coordinates[1] || `00.000`}/>
        //             </label>
        //         </div>
        //         <div className="coordinateAdd__group">
        //             <label>
        //                 <span>Название</span>
        //                 <textarea placeholder={`Введите...`}/>
        //             </label>
        //         </div>
        //         <button className="coordinateAdd__button button_yellow" >Сохранить
        //         </button>
        //         <button className="coordinateAdd__button button_white" type="button" onClick={close()}>Отменить</button>
        //     </form>
        // </section>
    }
}