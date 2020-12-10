import React, {Component} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import axios from "axios"

import Navigation from "./components/navigation/Navigation.js"
import Coordinate from "./components/coordinate/Coordinate.js"
import Request from "./components/request/Request.js"
import Vacancy from "./components/vacancy/Vacancy.js"
import Slider from "./components/slider/Slider.js"
import Setting from "./components/setting/Setting.js"

export default class Sign extends Component{
    state = {
        errorAuth: false,
        errorComponent:'admin/sign',
    }

    componentDidMount() {
        this.checkAutorisation()
    }

    checkAutorisation(){
        axios({
            method: 'get',
            url: process.env.API_BASE + '/signin',
            withCredentials: true
        })
            .then((response)=>{
            })
            .catch((error)=>{
                this.setState({
                    errorAuth: true
                })
            })
    }

    render() {
        if(this.state.errorAuth) {
            return <Redirect to={this.state.errorComponent}/>
        }
        return(
            <>
                <Navigation
                changeLink = {this.changeLink}
                />
                <Switch>
                    <Route  path="/admin/coordinate"     component={Coordinate} />
                    <Route  path="/admin/request"     component={Request} />
                    <Route  path="/admin/vacancy"     component={Vacancy} />
                    <Route  path="/admin/slider"     component={Slider} />
                    <Route  path="/admin/setting"     component={Setting} />
                </Switch>
            </>
            )
    }
}