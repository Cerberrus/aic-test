import React  from "react"
import Helmet from "react-helmet"

// Import components
import Header from "~user/components/header/Header"
import Footer from "~user/components/footer/Footer"

// Import static files
import "./Error.css"

const Error = () => (
    <>
        <Helmet title="404"/>

        <div className="page__body">
            <Header/>
            <main className="errorPage container">
                <h1>404<br/>Страница не найдена</h1>
            </main>
            <Footer/>
        </div>
    </>
)

export default Error
