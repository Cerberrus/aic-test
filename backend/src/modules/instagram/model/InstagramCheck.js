const Check = require("../../../lib/Check");

class InstagramCheck extends Check{
  async checkPost(req, res, next){
    const result = await super.checkFieldsPost(req.body, {
      fieldsRequired: ["username", "password"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).json(result);
  };
}

module.exports = new InstagramCheck();
