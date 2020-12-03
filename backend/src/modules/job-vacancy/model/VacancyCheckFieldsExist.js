const CheckExist = require("../../../lib/CheckFields");

class VacancyCheckFieldsExist extends CheckExist {
  checkPost = async (req, res, next) => {
    console.log("Get check");
    const result = await this.checkFieldsPost(req.query, {
      fieldsRequired: ["title", "imageDescription"],
      fieldsNotRequired: ["imagePath"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };
}

module.exports = new VacancyCheckFieldsExist();
