const authentication = require("./model/Authentication");

const toSignIn = async (req, res) => {
  try {
    const jwt = await authentication.signIn(req);
    if (jwt !== false)
      res.status(201)
       .cookie("auth", jwt,{
         sameSite: 'lax',
         secure: false
       })
       .send("jwt token создан");
    else res.status(403).send();
  } catch (e) {
    console.log(e)
    res.status(402).send(e);
  }
};
const toSignOut = (req, res) => {
  try {
    res.status(200)
        .clearCookie("auth")
        .send( "jwt token уничтожен" );
  } catch (e) {
    res.status(402).send();
  }
};
module.exports = {
  toSignIn,
  toSignOut,
};