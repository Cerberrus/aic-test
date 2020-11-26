const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get(
    '/api/job-request',
    controller.toGetJobRequestList
)
router.get(
    '/api/job-request/:id',
    controller.toGetJobRequest
)
router.post(
    '/api/job-request',
    controller.toPostJobRequest
)
router.put(
    '/api/job-request/:id',
    controller.toUpdateJobRequest
)
router.delete(
    '/api/job-request/:id',
    controller.toDeleteJobRequest
)

module.exports = router