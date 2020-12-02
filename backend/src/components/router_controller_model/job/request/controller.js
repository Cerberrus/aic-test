const manage = require('./model/ManageRequest')
const checkFiled = require('../../../lib/CheckFields')
const jobRequestCheckFields = require('./model/RequestCheckFieldsExist')

const toGetJobRequestList=async (req, res)=>{
    try{
        const data = await manage.getJobRequestList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toGetJobRequest=async (req, res)=>{
    try{
        const data = await manage.getJobRequest(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toPostJobRequest=async (req, res)=>{
    try{
        if (/*!req.recaptcha.error*/true) {
            const data = await manage.postJobRequest(req.query)
            res.status(200).json(data)
        } else {
            console.log('error')
        }
    }
    catch (e) {
        res.status(404).send()
    }
}
const toUpdateJobRequest=async (req, res)=>{
    try{
        checkFiled.__checkExist(req.query, jobRequestFileds)
        const data = await manage.updateJobRequest(req.params, req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toDeleteJobRequest=async (req, res)=>{
    try{
        const data = await manage.deleteJobRequest(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toCheckFieldsPost = (req, res, next)=>{
    const response = jobRequestCheckFields.toCheckPost(req.params)
    if(response)    next()
    else res.status(405).json({error: 'some field not exist'})
}

module.exports = {
    toGetJobRequestList,
    toGetJobRequest,
    toPostJobRequest,
    toUpdateJobRequest,
    toDeleteJobRequest,
    toCheckFieldsPost
}