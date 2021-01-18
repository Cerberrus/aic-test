const sliderRoute = require("express").Router();
const SliderController = require("./slider.controller");
const authCheck = require("../../lib/AuthCheck");
const checkFields = require("./model/SliderCheck");
const uploader = require("./model/SliderUpload");

sliderRoute.get("/api/slider", SliderController.prototype.toGetSliderList);
sliderRoute.get("/api/slider/:id", SliderController.prototype.toGetSlider);
sliderRoute.post(
    "/api/slider",
    authCheck.toCheck,
    checkFields.checkPost,
    uploader,
    SliderController.prototype.toPostSlider
);
sliderRoute.put(
    "/api/slider/:id",
    authCheck.toCheck,
    checkFields.checkPost,
    uploader,
    SliderController.prototype.toUpdateSlider
);
sliderRoute.delete(
    "/api/slider/:id",
    authCheck.toCheck,
    SliderController.prototype.toDeleteSlider
);

module.exports = sliderRoute;