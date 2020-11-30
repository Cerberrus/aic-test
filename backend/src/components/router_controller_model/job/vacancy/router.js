const express = require('express')
const controller = require('./controller')
const authCheck = require('../../../lib/AuthCheck')
const checkExist = require('../vacancy/model/VacancyCheckFieldsExist')
const uploader = require('./model/UploadImage')

const router = express.Router()

router.get(
    '/api/job-vacancy',
    controller.toGetJobVacancyList
)
router.get(
    '/api/job-vacancy/:id',
    controller.toGetJobVacancy
)
router.post(
    '/api/job-vacancy',
    authCheck.toCheck,
    checkExist.checkFieldsPost,
    uploader,
    controller.toPostJobVacancy
)
router.delete(
    '/api/job-vacancy/:id',
    authCheck.toCheck,
    controller.toDeleteJobVacancy
)

module.exports = router