const CheckExist = require("../../../lib/CheckFields");

class InstagramCheckFieldsExist extends CheckExist {
  checkPost = async (req, res, next) => {
    const result = await this.checkPost(req.query, {
      fieldsRequired: ["username", "password"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };
}

module.exports = new InstagramCheckFieldsExist();