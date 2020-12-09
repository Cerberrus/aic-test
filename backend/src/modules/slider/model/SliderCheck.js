const Check = require("../../../lib/Check");
const host = process.env.SERVER_HOST

class SliderCheck extends Check {
  async checkPost(req, res, next){
    const query = req.query
    const result = await super.checkFieldsPost(query, {
      fieldsRequired: ["title", "imageDescription"],
      fieldsNotRequired: ["imagePath"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).send(result);
  };
  async checkFileExist(sliderList) {
    for(let slider of sliderList){
      if(!!slider.path){
        const exist = await super.checkFileExist(slider.path)
        if(exist) {
          slider.path = await this.cutPath(slider.path, process.cwd() + process.env.FILES_UPLOADS)
          slider.path = slider.path.map(path => host + path)
        }
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
