import React  from "react"
import Helmet from "react-helmet"
import { Switch, Route } from "react-router-dom"

// Import components
import Navigation     from "./components/navigation/Navigation"
import Coordinate     from "./components/coordinate/Coordinate"
import CoordinateItem from "./components/coordinate-item/CoordinateItem"
import Vacancy        from "./components/vacancy/Vacancy"
import VacancyItem    from "./components/vacancy-item/VacancyItem"
import Slider         from "./components/slider/Slider"
import SliderItem     from "./components/slider-item/SliderItem"
import Setting        from "./components/setting/Setting"
import Summary        from "./components/summary/Summary"

//Import static files
import './Main.css'

const Sign = () => (
    <>
        <Helmet title="админ панель"/>

        <div className="admin container">
            <Navigation/>
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

export default  Sign
