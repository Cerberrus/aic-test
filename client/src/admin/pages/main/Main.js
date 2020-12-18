import React, { Component }        from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import axios  from "axios"

import Navigation from "./components/navigation/Navigation"
import Coordinate from "./components/coordinate/Coordinate"
import CoordinateItem from './components/coordinate-item/CoordinateItem'
import Summary     from "./components/summary/Summary"
import Vacancy     from "./components/vacancy/Vacancy"
import VacancyItem from "./components/vacancy-item/VacancyItem"
import Slider      from "./components/slider/Slider"
import SliderItem  from "./components/slider-item/SliderItem"
import Setting     from "./components/setting/Setting"

//Import static files
import './Main.css'

export default class Sign extends Component {
    state = {
        errorAuth: false,
    }

    componentDidMount() {
        this.checkAuthorisation()
    }

    checkAuthorisation(){
        axios({
            method: 'get',
            url: process.env.API_BASE + '/signin',
            withCredentials: true
        })
            .then((response)=>{
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
                // this.setState({
                //     errorAuth: true
                // })
            })
    }

    render() {
        if (this.state.errorAuth) {
            return <Redirect to="/admin/sign"/>
        }

        return(
            <>
                <Helmet title="админ панель"/>

                <div className="admin container">
                    <Navigation
                        changeLink = {this.changeLink}
                    />

                    <main>
                        <Switch>
                            <Route  exact path="/admin/coordinate"     component={Coordinate} />
                            <Route        path="/admin/coordinate/:id" component={CoordinateItem} />
                            <Route  exact path="/admin/vacancy"        component={Vacancy} />
                            <Route        path="/admin/vacancy/:id"    component={VacancyItem} />
                            <Route  exact path="/admin/slider"         component={Slider}  />
                            <Route        path="/admin/slider/:id"     component={SliderItem} />
                            <Route  exact path="/admin/request"        component={Summary} />
                            <Route  exact path="/admin"                component={Setting} />
                        </Switch>
                    </main>
                </div>
            </>
        )
    }
}
