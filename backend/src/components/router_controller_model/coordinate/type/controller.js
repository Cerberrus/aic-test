const manageCoordinate = require('./ManageCoordinateType')

const toGetCoordinateTypeList=async (req, res)=>{
    try{
        const data = await manageCoordinate.getCoordinateTypeList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toPostCoordinateType=async (req, res)=>{
    try{
        const data = await manageCoordinate.postCoordinateType(req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toDeleteCoordinateType=async (req, res)=>{
    try{
        const data = await manageCoordinate.deleteCoordinateType(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}

module.exports = {
    toGetCoordinateTypeList,
    toPostCoordinateType,
    toDeleteCoordinateType
}