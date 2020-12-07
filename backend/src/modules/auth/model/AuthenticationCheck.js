const CheckExist = require("../../../lib/Check");

class AuthenticationCheck extends CheckExist {
  checkFieldsSignIn = async (req, res, next) => {
    const result = await this.checkFieldsPost(req.body, {
      fieldsRequired: ["username", "password"],
    });
    if (result.checkExist.error === false && result.checkNull.error === false)
      next();
    else res.status(400).send(result);
  };
}

module.exports = new AuthenticationCheck();