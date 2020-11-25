import express          from 'express'
import dotenv           from 'dotenv'
import cookieParser     from 'cookie-parser'
import bodyParser       from 'body-parser'
import authRouter       from './components/router_controller_model/auth/router'
import coordinateRouter from './components/router_controller_model/coordinate/router'
import jobRequestRouter from './components/router_controller_model/job/request/router'
import jobVacancyRouter from './components/router_controller_model/job/vacancy/router'
import settingRouter    from './components/router_controller_model/settings/router'

dotenv.config()                 // connect .env file and use them variables

const app = express()


app.use(authRouter)             //
app.use(coordinateRouter)       //
app.use(jobRequestRouter)       // include all routes
app.use(jobVacancyRouter)       //
app.use(settingRouter)          //

app.use(bodyParser.json)        // use for get information from body
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())         // use for get and set information from cookie

module.exports = app