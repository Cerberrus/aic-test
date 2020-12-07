const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const checkField = require("./model/RequestCheck");
const ReCaptcha = require("../../lib/ReCaptcha");
const uploader = require("./model/UploadSummary");

router.get(
  "/api/request",
  authCheck.toCheck,
  controller.toGetJobRequestList
);
router.post(
  "/api/request",
  /*ReCaptcha.verify,*/
  checkField.checkFieldsPost,
  uploader,
  controller.toPostJobRequest
);
router.put(
  "/api/request/:id",
  authCheck.toCheck,
  checkField.checkFieldsPost,
  controller.toUpdateJobRequest
);
router.delete(
  "/api/request/:id",
  authCheck.toCheck,
  controller.toDeleteJobRequest
);

router.get(
    "/api/job-request-status",
    controller.toGetJobRequestStatusList
);
router.post(
    "/api/job-request-status",
    controller.toPostJobRequestStatus
);
router.put(
    "/api/job-request-status/:id",
    controller.toUpdateJobRequestStatus
);
router.delete(
    "/api/job-request-status/:id",
    controller.toDeleteJobRequestStatus
);


module.exports = router;