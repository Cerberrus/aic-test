import React, {Component} from "react"
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios"

import SignForm from "./components/SignForm/SignForm.js"

export default class Sign extends Component{
    state = {
        redirect: null
    }

    toSignIn =(username, password)=> {
        const cookies = new Cookies();
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/signin',
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