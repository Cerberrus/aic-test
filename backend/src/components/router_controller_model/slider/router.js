const express = require('express')
const controller = require('./controller')
const authCheck = require('../../lib/AuthCheck')
const checkFields = require('./model/SliderDataCheckFieldsExist')
const uploader = require('./model/UploadImage')

const router = express.Router()

router.get(
    '/api/slider',
    controller.toGetSliderDataList
)
router.post(
    '/api/slider',
    authCheck.toCheck,
    checkFields.checkPost,
    uploader,
    controller.toPostSliderData
)
router.delete(
    '/api/slider/:id',
    authCheck.toCheck,
    controller.toDeleteSliderData
)

module.exports = router