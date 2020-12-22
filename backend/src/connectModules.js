const express = require("express");

const path = require('path');
const dotenv = require("dotenv");
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
}); // connect .env file and use them variables


const authCheck = require("./lib/AuthCheck");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const folder = require('./backendInitial')
const instagram = require("./modules/instagram/model/Instagram");

folder.folderInit()
instagram.init();

const app = express();

const corsOptions = {
    origin: ['https://aic.xutd.tk', 'http://localhost:3001'],    // Указываем разрешенный хосты
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
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
  /*authCheck.toCheck,*/
  express.static(process.cwd() + process.env.FILES_PRIVATE_FOLDER)
);

app.use(require("./modules/auth/router")); //
app.use(require("./modules/coordinate/router")); //
app.use(require("./modules/job-request/router")); // include all routes
app.use(require("./modules/job-vacancy/router")); //
app.use(require("./modules/job-vacancy/router")); //
app.use(require("./modules/slider/router")); //
app.use(require("./modules/instagram/router")); //
app.use(require("./modules/settings/router")); //

module.exports = app;
