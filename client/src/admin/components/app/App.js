import React, { Component } from "react"
import {Switch, Route } from "react-router-dom"
import Helmet   from "react-helmet"
import loadable from "@loadable/component"
import axios from "axios"

// Import components with loadable for tree shaking
const MainPage = loadable(() => import('~admin/pages/main/Main'))
const SignPage = loadable(() => import('~admin/pages/sign/Sign'))
const Header   = loadable(() => import('~admin/components/header/Header'))
const Footer   = loadable(() => import('~user/components/footer/Footer'))

// Import model
import model from "~src/model/model"

// Import static files
import shortIcon from '~user/static/images/temporary/logo.png'

export default class App extends Component {
    model = new model()

    state = {
        authorization: false
    }

    componentDidMount() {
        this.getAuthorizationStatus()
    }

    getAuthorizationStatus()  {
        axios({
            method: 'get',
            url: process.env.API_BASE +'/signin',
            withCredentials: true,
        })
            .then((response)=>{
                if (response.status !== 200) {
                    this.setState({
                        authorization: false
                    })
                    return this.props.history.push('/admin/sign')
                } else {
                    this.setState({
                        authorization: true
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
                this.props.history.push("/admin/sign")
            })

        // this.model.getAuthorizationStatus()
        //     .then((response) => {
        //         console.log("CHECK: ",response);
        //         if (response.status !== 200) {
        //             this.setState({
        //                 authorization: false
        //             })
        //             return this.props.history.push('/admin/sign')
        //         }
        //     })
    }

    render() {
        const { authorization } = this.state

        return (
            <>
                <Helmet
                    defaultTitle ="гросс маркет"
                    titleTemplate="гросс маркет - %s"
                >
                    <meta name="viewport" content="width=1110"/>
                    <link rel="shortcut icon" href={shortIcon} />
                </Helmet>

                <div className="page__body">
                    <Header authorization={authorization} />
                    <Switch>
                        <Route       path="/admin/sign" component={SignPage} />
                        <Route exact path="/admin"      component={MainPage} />
                        <Route       path="/admin/*"    component={MainPage} />
                    </Switch>
                    <Footer/>
                </div>
            </>
        )
    }
}


