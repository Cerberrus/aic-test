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
}

module.exports = new VacancyCheck();
