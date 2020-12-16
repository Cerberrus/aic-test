import React, { Component }        from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import axios  from "axios"

import Navigation from "./components/navigation/Navigation"
import Coordinate from "./components/coordinate/Coordinate"
import CoordinateItem from './components/coordinate-item/CoordinateItem'
import Request    from "./components/request/Request"
import Vacancy    from "./components/vacancy/Vacancy"
import Slider     from "./components/slider/Slider"
import SliderItem from "./components/slider-item/SliderItem"
import Setting    from "./components/setting/Setting"

//Import static files
import './Main.css'

export default class Sign extends Component{
    state = {
        errorAuth: false,
        errorComponent:'admin/sign',
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
                // console.log(response);
            })
            // .catch((error)=>{
            //     console.log(error);
            //     this.setState({
            //         errorAuth: true
            //     })
            // })
    }

    render() {
        if (this.state.errorAuth) {
            return <Redirect to={this.state.errorComponent}/>
        }

        return(
            <>
                <Helmet>
                    <title>админ панель</title>
                </Helmet>

                <div className="adminContent container">
                    <Navigation
                        changeLink = {this.changeLink}
                    />

                    <main>
                        <Switch>
                            <Route  exact path="/admin/coordinate"     component={Coordinate} />
                            <Route        path="/admin/coordinate/:id" component={CoordinateItem} />
                            <Route  exact path="/admin/request"        component={Request} />
                            <Route        path="/admin/request/:id"    component={Request} />
                            <Route  exact path="/admin/vacancy"        component={Vacancy} />
                            <Route        path="/admin/vacancy/:id"    component={Vacancy} />
                            <Route  exact path="/admin/slider"         component={Slider}  />
                            <Route        path="/admin/slider/:id"     component={SliderItem} />
                            <Route  exact path="/admin/setting"        component={Setting} />
                        </Switch>
                    </main>
                </div>
            </>
        )
    }
}
