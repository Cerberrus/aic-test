const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");

router.get(
	"/api/information",
	controller.toGetPublicInformationList);
router.get(
	"/api/setting",
	/*authCheck.toCheck,*/
	controller.toGetSettingList);
router.post(
	"/api/setting",
	authCheck.toCheck,
	controller.toPostSetting);
router.delete(
  "/api/setting/:key",
  authCheck.toCheck,
  controller.toDeleteSetting
);

module.exports = router;