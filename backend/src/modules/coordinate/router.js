const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");

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

router.get(
	"/api/coordinate-type",
	controller.toPostCoordinateType
);
router.post(
	"/api/coordinate-type",
	controller.toPostCoordinateType
);
router.delete(
	"/api/coordinate-type/:id",
	controller.toDeleteCoordinateType
);

module.exports = router;