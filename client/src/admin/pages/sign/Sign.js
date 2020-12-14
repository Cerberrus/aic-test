import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import SignForm from "./components/SignForm/SignForm.js"

export default class Sign extends Component{
    state = {
        redirect: null
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
                    redirect: '/admin'
                })
            })
            .catch((error)=>{
            })
    }

    render() {
        const { redirect } = this.state

        return redirect ? <Redirect to={redirect}/> : <SignForm toSignIn={this.toSignIn}/>
    }
}