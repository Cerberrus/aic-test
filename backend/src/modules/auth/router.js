const router = require("express").Router();
const controller = require("./controller");
const checkExist = require("./model/AuthenticationCheck");
const checkAuth = require("../../lib/AuthCheck");

router.get(						//Проверка валидности пользователя
	"/api/signin",
	checkAuth.toCheck,
	((req, res) => res.status(200).send())
);
router.post(					//Авторизация пользователя
	"/api/signin",
	checkExist.checkFieldsSignIn,
	controller.toSignIn
);
router.post(					//Выход пользователя
	"/api/signout",
	controller.toSignOut
);

module.exports = router;