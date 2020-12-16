const Check = require("../../../lib/Check");

class SliderCheck extends Check {
  async checkPost(req, res, next){
    const query = req.query
    const result = await super.checkFieldsPost(query, {
      fieldsRequired: ["title", "imageDescription"],    // Обязательные поля в запросе
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).send(result);
  };
}

module.exports = new SliderCheck();
