const manage = require('./model/ManageRequest')
const checkFiled = require('../../../lib/CheckFields')

const jobRequestFileds = ['jobVacancyId', 'name', 'happyDate', 'phoneNumber', 'sex', 'email', 'resumeText', 'resumeFilePath']

const toGetJobRequestList=async (req, res)=>{
    try{
        const data = await manage.getJobRequestList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toGetJobRequest=async (req, res)=>{
    try{
        const data = await manage.getJobRequest(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toPostJobRequest=async (req, res)=>{
    try{
        checkFiled.checkExist(req.query, jobRequestFileds)
        if (!req.recaptcha.error) {
            const data = await manage.postJobRequest(req.query)
            res.status(200).json(data)
        } else {
            console.log('error')
        }
    }
    catch (e) {
        res.status(404).send
    }
}
const toUpdateJobRequest=async (req, res)=>{
    try{
        checkFiled.checkExist(req.query, jobRequestFileds)
        const data = await manage.updateJobRequest(req.params, req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toDeleteJobRequest=async (req, res)=>{
    try{
        const data = await manage.deleteJobRequest(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}

module.exports = {
    toGetJobRequestList,
    toGetJobRequest,
    toPostJobRequest,
    toUpdateJobRequest,
    toDeleteJobRequest
}