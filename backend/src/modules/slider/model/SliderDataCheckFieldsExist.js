const CheckExist = require("../../../lib/CheckFields");

class SliderDataCheckFieldsExist extends CheckExist {
  checkPost = async (req, res, next) => {
    const result = await this.checkPost(req.query, {
      fieldsRequired: ["title", "imageDescription"],
      fieldsNotRequired: ["imagePath"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };
}

module.exports = new SliderDataCheckFieldsExist();
