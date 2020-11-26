const express = require('express')
const controller = require('./controller')
const authCheck = require('../../auth/AuthCheck')

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
    controller.toPostJobVacancy
)
router.put(
    '/api/job-vacancy/:id',
    authCheck.toCheck,
    controller.toUpdateJobVacancy
)
router.delete(
    '/api/job-vacancy/:id',
    authCheck.toCheck,
    controller.toDeleteJobVacancy
)

module.exports = router