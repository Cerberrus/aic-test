const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get(
	"/api/job-job-request-status",
	controller.toGetJobRequestStatusList
);
router.post(
	"/api/job-job-request-status",
	controller.toPostJobRequestStatus
);
router.put(
	"/api/job-job-request-status/:id",
	controller.toUpdateJobRequestStatus
);
router.delete(
  "/api/job-job-request-status/:id",
  controller.toDeleteJobRequestStatus
);

module.exports = router;