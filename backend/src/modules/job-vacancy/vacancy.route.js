const vacancyRoute = require("express").Router();
const VacancyController = require("./vacancy.controller");
const authCheck = require("../../lib/AuthCheck");
const checkExist = require("./model/VacancyCheck");
const uploader = require("./model/VacancyUpload");

vacancyRoute.get(
    "/api/vacancy",
    VacancyController.prototype.toGetVacancyList 	// Отправляем данные в контроллер
);
vacancyRoute.get(
    "/api/vacancy/:id",
    VacancyController.prototype.toGetVacancy 	// Отправляем данные в контроллер
);
vacancyRoute.post(
    "/api/vacancy",
    authCheck.toCheck,			// Проверяем авторизован ли пользователь
    checkExist.checkPost,			// Проверяем обязательные поля
    uploader,						// Загружем файл(изображение)
    VacancyController.prototype.toPostVacancy 	// Отправляем данные в контроллер
);
vacancyRoute.put(
    "/api/vacancy/:id",
    authCheck.toCheck,				// Проверяем авторизован ли пользователь
    checkExist.checkPost,			// Проверяем обязательные поля
    uploader,						// Загружем файл(изображение)
    VacancyController.prototype.toUpdateVacancy 	// Отправляем данные в контроллер
);
vacancyRoute.delete(
    "/api/vacancy/:id",
    authCheck.toCheck,			// Проверяем авторизован ли пользователь
    VacancyController.prototype.toDeleteVacancy // Отправляем данные в контроллер
);

module.exports = vacancyRoute;