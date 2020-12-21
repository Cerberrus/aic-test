const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const checkField = require("./model/RequestCheck");
const ReCaptcha = require("../../lib/ReCaptcha");
const uploader = require("./model/UploadSummary");

router.get(
  "/api/summary",
  authCheck.toCheck,                // Проверяем авторизован ли пользователь
  controller.toGetJobRequestList    // Отправляем данные в контроллер
);
router.post(
  "/api/summary",
  ReCaptcha.verify,                 // Проверка на правильность recaptcha
  checkField.checkFieldsPost,       // Проверяем обязательные поля
  uploader,                         // Загружем файл
  controller.toPostJobRequest       // Отправляем данные в контроллер
);
router.put(
  "/api/summary/:id",
  authCheck.toCheck,                // Проверяем авторизован ли пользователь
  controller.toUpdateJobRequest     // Отправляем данные в контроллер
);
router.delete(
  "/api/summary/:id",
  authCheck.toCheck,               // Проверяем авторизован ли пользователь
  controller.toDeleteJobRequest     // Отправляем данные в контроллер
);

router.get(
    "/api/summary-status",
    controller.toGetJobRequestStatusList    // Отправляем данные в контроллер
);
router.post(
    "/api/summary-status",
    controller.toPostJobRequestStatus       // Отправляем данные в контроллер
);
router.put(
    "/api/summary-status/:id",
    controller.toUpdateJobRequestStatus     // Отправляем данные в контроллер
);
router.delete(
    "/api/summary-status/:id",
    controller.toDeleteJobRequestStatus     // Отправляем данные в контроллер
);


module.exports = router;