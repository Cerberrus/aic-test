import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios  from "axios"
import Helmet from "react-helmet"

import SignForm from "./components/SignForm/SignForm.js"

// Import static files
import './Sign.css'

export default class Sign extends Component{
    state = {
        redirect: false
    }

    toSignIn =(username, password)=> {
        axios({
            method: 'post',
            url: process.env.API_BASE +'/signin',
            withCredentials: true,
            data:{username, password}
        })
            .then((response)=>{
                this.setState({
                    redirect: true
                })
            })
            .catch((error)=>{
            })
    }

    render() {
        const { redirect } = this.state

        if (redirect) {
            return <Redirect to="/admin"/>
        }

        return (
            <>
                <Helmet title="авторизация" />

                <main className="signPage">
                    <SignForm toSignIn={this.toSignIn}/>
                </main>
            </>
        )
    }
}
