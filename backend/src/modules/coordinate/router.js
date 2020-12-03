const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const typeRouter = require("./type/router");

router.get(
	"/api/coordinate",
	controller.toGetCoordinateList
);
router.post(
	"/api/coordinate",
	authCheck.toCheck,
	controller.toPostCoordinate
);
router.delete(
  "/api/coordinate/:id",
  authCheck.toCheck,
  controller.toDeleteCoordinate
);

router.use(typeRouter);

module.exports = router;