const express = require('express')
const controller = require('./controller')
const authCheck = require('../../../lib/AuthCheck')
const checkField = require('../request/model/RequestCheckFieldsExist')
const statusRouter = require('./status/router')
const ReСaptcha = require('./model/ReCaptcha')
const uploader = require('./model/UploadSummary')
const router = express.Router()

router.get(
    '/api/job-request',
    authCheck.toCheck,
    controller.toGetJobRequestList
)
router.get(
    '/api/job-request/:id',
    authCheck.toCheck,
    controller.toGetJobRequest
)
router.post(
    '/api/job-request',
    ReСaptcha.verify,
    uploader,
    checkField.checkPost,
    controller.toPostJobRequest
)
router.put(
    '/api/job-request/:id',
    authCheck.toCheck,
    checkField.checkFieldsPost,
    controller.toUpdateJobRequest
)
router.delete(
    '/api/job-request/:id',
    authCheck.toCheck,
    controller.toDeleteJobRequest
)
router.use(statusRouter)
module.exports = router