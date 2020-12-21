const jwt = require("jsonwebtoken");
const checkType = async (userJWT) => {          //Проверяем тип пользователя
  try {
    if (userJWT.type === "admin") return true;
    else return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const checkIP = async (userJWT, ip) => {      //Проверяем ip адресс на валидность
  try {
    if (userJWT.ip === ip) return true;
    else return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const toCheck = async (req, res, next) => {     //Проверяем наличие jwt токена и его валидность
  try {
    if ("auth" in req.cookies) {
      const forwarded = req.headers["x-forwarded-for"];
      const ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
      const jwtPayload = await jwt.verify(
        req.cookies.auth,
        process.env.JWT_SECURY_KEY
      );
      const isType = await checkType(jwtPayload);
      const isIP = await checkIP(jwtPayload, ip);
      if (isType && isIP) next();
      else res.status(303).send("JWT error");
    } else {
      res.status(303).send("JWT not exist in cookie");
    }
  } catch (e) {
    res.status(406).send();
  }
};
module.exports = { toCheck };