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

const instagram = require("./modules/instagram/model/Instagram");
const authCheck = require("./lib/AuthCheck");
instagram.init();
dotenv.config(); // connect .env file and use them variables

const app = express();

app.use(cors());
app.use(bodyParser.json()); // use for get information from body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECURE_KEY)); // use for get and set information from cookie

app.use("/static", express.static("C:/GitHub/aic-test/backend/uploads/static"));
app.use(
  "/private",
  authCheck.toCheck,
  express.static("C:/GitHub/aic-test/backend/uploads/private")
);

app.use(authRouter); //
app.use(coordinateRouter); //
app.use(jobRequestRouter); // include all routes
app.use(jobVacancyRouter); //
app.use(settingRouter); //
app.use(sliderRouter); //
app.use(instagramRouter); //

module.exports = app;
