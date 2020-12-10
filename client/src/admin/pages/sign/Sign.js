import React, {Component} from "react"
import { Redirect } from "react-router-dom";
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
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
        else{
            return <div>
                <SignForm
                    toSignIn={this.toSignIn}
                />
            </div>
        }
    }
}