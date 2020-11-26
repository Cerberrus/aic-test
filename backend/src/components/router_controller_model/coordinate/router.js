const express = require('express')
const controller = require('./controller')
const authCheck = require('../auth/AuthCheck')

const router = express.Router()

router.get(
    '/api/coordinate',
    controller.toGetCoordinateList
)
router.post(
    '/api/coordinate',
    authCheck.toCheck,
    controller.toPostCoordinate
)
router.put(
    '/api/coordinate/:id',
    authCheck.toCheck,
    controller.toUpdateCoordinate
)
router.delete(
    '/api/coordinate/:id',
    authCheck.toCheck,
    controller.toDeleteCoordinate
)

module.exports = router