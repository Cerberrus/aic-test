const CheckExist = require("../../../lib/Check");
const host = process.env.SERVER_HOST

class VacancyCheck extends CheckExist {


  async checkPost(req, res, next){
    const result = await super.checkFieldsPost(req.query, {
      fieldsRequired: ["title", "description"],
      fieldsNotRequired: ["imageDescription"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).send(result);
  };

  async checkFileExist(vacancyList) {
    for(let vacancy of vacancyList){
      if(!!vacancy.path){
        const exist = await super.checkFileExist(vacancy.path)
        if(exist){
          vacancy.path = await this.cutPath(vacancy.path, process.cwd()+ process.env.FILES_UPLOADS)
          vacancy.path = vacancy.path.map(path => host + path)
        }
      }
     }
    return vacancyList
  }
}

module.exports = new VacancyCheck();
