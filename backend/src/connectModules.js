const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./modules/auth/router");
const coordinateRouter = require("./modules/coordinate/router");
const jobRequestRouter = require("./modules/job-request/router");
const jobVacancyRouter = require("./modules/job-vacancy/router");
const settingRouter = require("./modules/settings/router");
const sliderRouter = require("./modules/slider/router");
const instagramRouter = require("./modules/instagram/router");
const folder = require('./backendInitial')

const instagram = require("./modules/instagram/model/Instagram");
folder.folderInit()
instagram.init();
const authCheck = require("./lib/AuthCheck");
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
}); // connect .env file and use them variables

const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',    // reqexp will match all prefixes
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,                // required to pass
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
}
app.use(cors(corsOptions));
app.use(bodyParser.json()); // use for get information from body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECURE_KEY)); // use for get and set information from cookie

app.use("/static", express.static(process.cwd()+process.env.FILES_STATIC_FOLDER));
app.use(
  "/private",
  authCheck.toCheck,
  express.static(process.cwd() + process.env.FILES_PRIVATE_FOLDER)
);

app.use(authRouter); //
app.use(coordinateRouter); //
app.use(jobRequestRouter); // include all routes
app.use(jobVacancyRouter); //
app.use(settingRouter); //
app.use(sliderRouter); //
app.use(instagramRouter); //

module.exports = app;
