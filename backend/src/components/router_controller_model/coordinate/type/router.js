const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get(
    '/api/coordinate-type',
    controller.toGetCoordinateTypeList
)
router.post(
    '/api/coordinate-type',
    controller.toPostCoordinateType
)
router.put(
    '/api/coordinate-type/:id',
    controller.toUpdateCoordinateType
)
router.delete(
    '/api/coordinate-type/:id',
    controller.toDeleteCoordinateType
)

module.exports = router