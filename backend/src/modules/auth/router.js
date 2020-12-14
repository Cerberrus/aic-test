const router = require("express").Router();
const controller = require("./controller");
const checkExist = require("./model/AuthenticationCheck");
const checkAuth = require("../../lib/AuthCheck");

router.get(
	"/api/signin",
	checkAuth.toCheck,
	((req, res) => res.status(200).send())
);
router.post(
	"/api/signin",
	checkExist.checkFieldsSignIn,
	controller.toSignIn
);
router.post(
	"/api/signup",
	checkExist.checkFieldsSignIn,
	controller.toSignIn
);
router.post(
	"/api/signout",
	controller.toSignOut
);

module.exports = router;