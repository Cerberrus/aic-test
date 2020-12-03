const router = require("express").Router();
const controller = require("./controller");
const checkExist = require("./model/AuthenticationCheckFieldsExist");

router.post(
	"/api/signin",
	checkExist.checkFieldsSignIn,
	controller.toSignIn
);
router.post(
	"/api/signout",
	controller.toSignOut
);

module.exports = router;