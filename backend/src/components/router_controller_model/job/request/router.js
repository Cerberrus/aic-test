const express = require('express')
const controller = require('./controller')
const authCheck = require('../../../lib/AuthCheck')
const checkField = require('../request/model/RequestCheckFieldsExist')
const statusRouter = require('./status/router')

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const options = {'theme':'dark'};
const recaptcha = new Recaptcha('6LfOQ-4ZAAAAACOFvjKDgtEwPjLqX3CdCPgTbTpL', '6LfOQ-4ZAAAAAEKE92rTSdegNuSdtzhsA6AXMlb2', options);

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
    recaptcha.middleware.verify,
    checkField.checkFieldsPost,
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