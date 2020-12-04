import React, {Component} from "react"
import Helmet from "react-helmet"
import NumberFormat from 'react-number-format'
import axios from "axios"

import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"

export default class Sign extends Component{
    render() {
        return <div>
            <Header/>
            <Footer/>
        </div>
    }
}