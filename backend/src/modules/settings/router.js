const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const check = require("./model/SettingCheck");

router.get(
	"/api/information",
	controller.toGetPublicInformationList);
router.get(
	"/api/setting",
	authCheck.toCheck,
	controller.toGetSettingList);
router.post(
	"/api/setting",
	authCheck.toCheck,
	check.checkPost,
	controller.toPostSetting);		// Принимает поля ключ(key) и значение(value)
router.put(
	"/api/setting",
	authCheck.toCheck,
	check.checkPost,
	controller.toPostSetting);		// Принимает поля ключ(key) и значение(value)
router.delete(
  "/api/setting/:key",
  authCheck.toCheck,
  controller.toDeleteSetting 		// Удаляет запись по ключу(key)
);

module.exports = router;