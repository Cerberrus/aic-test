const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const checkExist = require("./model/VacancyCheck");
const uploader = require("./model/VacancyUpload");

router.get(
	"/api/vacancy",
	controller.toGetJobVacancyList
);
router.get(
	"/api/vacancy/:id",
	controller.toGetJobVacancy
);
router.post(
  "/api/vacancy",
  authCheck.toCheck,
  checkExist.checkPost,
  uploader,
  controller.toPostJobVacancy
);
router.delete(
  "/api/vacancy/:id",
  authCheck.toCheck,
  controller.toDeleteJobVacancy
);

module.exports = router;