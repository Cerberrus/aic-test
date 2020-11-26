const express = require('express')
const controller = require('./controller')
const authCheck = require('../auth/AuthCheck')

const router = express.Router()

router.get(
    '/api/information',
    controller.toGetPublicInformationList
)
router.get(
    '/api/setting',
    authCheck.toCheck,
    controller.toGetSettingList
)
router.post(
    '/api/setting',
    authCheck.toCheck,
    controller.toPostSetting
)
router.put(
    '/api/setting/:key',
    authCheck.toCheck,
    controller.toUpdateSetting
)
router.delete(
    '/api/setting/:key',
    authCheck.toCheck,
    controller.toDeleteSetting
)

module.exports = router