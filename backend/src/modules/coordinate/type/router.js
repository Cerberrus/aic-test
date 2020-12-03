const router = require("express").Router();
const controller = require("./controller");

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