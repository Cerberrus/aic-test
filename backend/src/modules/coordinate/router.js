const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");

router.get(
	"/api/coordinate",
	controller.toGetCoordinateList
);
router.get(
	"/api/coordinate/:id",
	controller.toGetCoordinate
);
router.post(
	"/api/coordinate",
	authCheck.toCheck,
	controller.toPostCoordinate
);
router.put(
	"/api/coordinate/:id",
	authCheck.toCheck,
	controller.toUpdateCoordinate
);
router.delete(
  "/api/coordinate/:id",
  authCheck.toCheck,
  controller.toDeleteCoordinate
);

router.get(
	"/api/coordinate-type",
	controller.toGetCoordinateTypeList
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