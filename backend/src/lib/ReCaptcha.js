const axios = require("axios");

const verify = async (req, res, next) => {
  try {
    if (                                      //Отслеживает наличие поля в указанных телах
      "g-recaptcha-response" in req.query ||
      "g-recaptcha-response" in req.body
    ) {
      const responseRecaptcha =
        req.query["g-recaptcha-response"] || req.body["g-recaptcha-response"];
      const resultRecaptcha = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?response=${responseRecaptcha}&secret=6LfOQ-4ZAAAAAEKE92rTSdegNuSdtzhsA6AXMlb2`
      );
      if (resultRecaptcha.data.success) next();
      else res.status(301).send("invalid recaptcha");
    } else {
      res.status(408).send("recaptcha not found");
    }
  } catch (e) {
    res.status(401).send("Error");
  }
};

module.exports = { verify };
