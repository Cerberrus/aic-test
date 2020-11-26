const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get(
    '/api/coordinate',
    controller.toGetCoordinateList
)
router.post(
    '/api/coordinate',
    controller.toPostCoordinate
)
router.put(
    '/api/coordinate/:id',
    controller.toUpdateCoordinate
)
router.delete(
    '/api/coordinate/:id',
    controller.toDeleteCoordinate
)

module.exports = router