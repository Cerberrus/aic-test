const Check = require("../../../lib/Check");

class SliderCheck extends Check {
  async checkPost(req, res, next){
    const query = req.query
    const result = await super.checkFieldsPost(query, {
      fieldsRequired: ["title", "imageDescription"],
      fieldsNotRequired: ["imagePath"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };
  async checkFileExist(sliderList) {
    for(let slider of sliderList){
      if(!!slider.path){
        slider.path = await super.checkFileExist(slider.path)
        slider.path = await this.cutPath(slider.path,  'C:/GitHub/aic-test/backend/uploads')
      }
      }
    return sliderList
  }
  async checkFileExistWithoutCut(sliderList) {
    for(let slider of sliderList){
      slider.path = await super.checkFileExist(slider.path)
    }
    return sliderList
  }
}

module.exports = new SliderCheck();
