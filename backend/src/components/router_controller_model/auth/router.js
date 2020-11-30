const express = require('express')
const controller = require('./controller')
const checkExist = require('./model/AuthenticationCheckFieldsExist')

const router = express.Router()

router.post(
    '/api/signin',
    checkExist.checkFieldsSignIn,
    controller.toSignIn
)
router.post(
    '/api/signout',
    controller.toSignOut
)

module.exports = router