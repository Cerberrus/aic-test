const express = require('express')
const controller = require('./controller')
const checkAuth = require('../../lib/AuthCheck')
const checkExist = require('./model/InstagramCheckFieldsExist')

const router = express.Router()

router.get(
    '/api/instagram/image',
    controller.toGetInstagramPhotoList
)
router.post(
    '/api/instagram/signin',
    checkAuth.toCheck,
    checkExist.checkPost,
    controller.toUpdateUserInformation
)

module.exports = router