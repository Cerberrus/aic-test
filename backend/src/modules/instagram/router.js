const router = require("express").Router();
const controller = require("./controller");
const checkAuth = require("../../lib/AuthCheck");
const checkExist = require("./model/InstagramCheckFieldsExist");

router.get(
	"/api/instagram/image",
	controller.toGetInstagramPhotoList
);
router.post(
  "/api/instagram/signin",
  checkAuth.toCheck,
  checkExist.checkPost,
  controller.toUpdateUserInformation
);

module.exports = router;