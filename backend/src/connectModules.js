const express          = require('express')
const dotenv           = require('dotenv')
const cookieParser     = require('cookie-parser')
const bodyParser       = require('body-parser')
const authRouter       = require('./components/router_controller_model/auth/router')
const coordinateRouter = require('./components/router_controller_model/coordinate/router')
const jobRequestRouter = require('./components/router_controller_model/job/request/router')
const jobVacancyRouter = require('./components/router_controller_model/job/vacancy/router')
const settingRouter = require('./components/router_controller_model/settings/router')

dotenv.config()                 // connect .env file and use them variables

const app = express()
const router = express.Router()

app.use(bodyParser.json())        // use for get information from body
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECURE_KEY))         // use for get and set information from cookie
app.use(authRouter)             //
app.use(coordinateRouter)       //
app.use(jobRequestRouter)       // include all routes
app.use(jobVacancyRouter)       //
app.use(settingRouter)          //

module.exports = app