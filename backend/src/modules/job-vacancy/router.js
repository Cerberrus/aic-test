const router = require("express").Router();
const controller = require("./controller");
const authCheck = require("../../lib/AuthCheck");
const checkExist = require("./model/VacancyCheck");
const uploader = require("./model/VacancyUpload");

router.get(
	"/api/vacancy",
	controller.toGetJobVacancyList 	// Отправляем данные в контроллер
);
router.get(
	"/api/vacancy/:id",
	controller.toGetJobVacancy 	// Отправляем данные в контроллер
);
router.post(
  "/api/vacancy",
  /*authCheck.toCheck,			*/// Проверяем авторизован ли пользователь
  checkExist.checkPost,			// Проверяем обязательные поля
  uploader,						// Загружем файл(изображение)
  controller.toPostJobVacancy 	// Отправляем данные в контроллер
);
router.put(
	"/api/vacancy/:id",
	/*authCheck.toCheck,	*/			// Проверяем авторизован ли пользователь
	checkExist.checkPost,			// Проверяем обязательные поля
	uploader,						// Загружем файл(изображение)
	controller.toUpdateJobVacancy 	// Отправляем данные в контроллер
);
router.delete(
  "/api/vacancy/:id",
  /*authCheck.toCheck,		*/	// Проверяем авторизован ли пользователь
  controller.toDeleteJobVacancy // Отправляем данные в контроллер
);

module.exports = router;