const CheckExist = require("../../../lib/Check");

class VacancyCheck extends CheckExist {
  async checkPost(req, res, next){
    const result = await super.checkFieldsPost(req.query, {
      fieldsRequired: ["title", "description"],
      fieldsNotRequired: ["imageDescription"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };

  async checkFileExist(vacancyList) {
    for(let vacancy of vacancyList){
      if(!!vacancy.path){
        vacancy.path = await super.checkFileExist(vacancy.path)
        vacancy.path = await this.cutPath(vacancy.path, process.cwd()+ process.env.FILES_UPLOADS)
      }
     }
    return vacancyList
  }
}

module.exports = new VacancyCheck();
