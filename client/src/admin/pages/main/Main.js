import React, { Component }  from "react"
import { Switch, Route }     from "react-router-dom"
import Helmet from "react-helmet"

// Import components
import Header         from "~admin/components/header/Header"
import Footer         from "~user/components/footer/Footer"
import Navigation     from "./components/navigation/Navigation"
import Coordinate     from "./components/coordinate/Coordinate"
import CoordinateItem from "./components/coordinate-item/CoordinateItem"
import Vacancy        from "./components/vacancy/Vacancy"
import VacancyItem    from "./components/vacancy-item/VacancyItem"
import Slider         from "./components/slider/Slider"
import SliderItem     from "./components/slider-item/SliderItem"
import Setting        from "./components/setting/Setting"
import Summary        from "./components/summary/Summary"

// Import model
import model from "~src/model/model"

//Import static files
import "./Main.css"

export default class Main extends Component {
    model = new model()

    state ={
        authorization: false
    }

    componentDidMount() {
        this.checkAuthorization(false)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkAuthorization(prevState)
    }

    checkAuthorization = (prevState) => {
        this.model.getAuthorizationStatus()
            .then((response) => {
                if (response.status !== 200 && prevState === false) {
                    return this.props.history.replace("/admin/sign")
                } else {
                    if (prevState === false) {
                        this.setState({
                            authorization: true
                        })
                    }
                }
            })
    }

    render() {
        const { history } = this.props
        const { authorization } = this.state

        return (
            <>
                <Helmet title="админ панель">
                    <meta name="viewport" content="width=1110"/>
                </Helmet>

                <div className="page__body">
                    <Header authorization={true} history={history} />
                    {authorization && (
                        <div className="admin container">
                            <Navigation/>
                            <main>
                                <Switch>
                                    <Route  exact path="/admin"                component={Setting} />
                                    <Route  exact path="/admin/coordinate"     component={Coordinate} />
                                    <Route        path="/admin/coordinate/:id" component={CoordinateItem} />
                                    <Route  exact path="/admin/vacancy"        component={Vacancy} />
                                    <Route        path="/admin/vacancy/:id"    component={VacancyItem} />
                                    <Route  exact path="/admin/slider"         component={Slider}  />
                                    <Route        path="/admin/slider/:id"     component={SliderItem} />
                                    <Route  exact path="/admin/request"        component={Summary} />
                                </Switch>
                            </main>
                        </div>
                    )}
                    <Footer/>
                </div>
            </>
        )
    }
}
