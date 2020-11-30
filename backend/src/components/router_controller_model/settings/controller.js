const manageSettings = require('./model/ManageSettings')

const toGetSettingList=async (req, res)=>{
    try{
        const data = await manageSettings.getSettingList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toGetPublicInformationList=async (req, res)=>{
    try{
        const data = await manageSettings.getPublicInformationList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toGetSetting=async (req, res)=>{
    try{
        const data = await manageSettings.getSetting(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toPostSetting=async (req, res)=>{
    try{
        const data = await manageSettings.postSetting(req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toDeleteSetting=async (req, res)=>{
    try{
        const data = await manageSettings.deleteSetting(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}

module.exports = {
    toGetPublicInformationList,
    toGetSettingList,
    toGetSetting,
    toPostSetting,
    toDeleteSetting
}