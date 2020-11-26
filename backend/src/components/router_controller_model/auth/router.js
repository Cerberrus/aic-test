const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.post(
    '/api/signin',
    controller.toSignIn
)
router.post(
    '/api/signout',
    controller.toSignOut
)

module.exports = router