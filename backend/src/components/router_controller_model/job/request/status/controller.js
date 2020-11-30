const manage = require('./ManageStatus')

const toGetJobRequestStatusList=async (req, res)=>{
    try{
        const data = await manage.getJobRequestStatusList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toPostJobRequestStatus=async (req, res)=>{
    try{
        const data = await manage.postJobRequestStatus(req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toUpdateJobRequestStatus=async (req, res)=>{
    try{
        const data = await manage.updateJobRequestStatus(req.params, req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toDeleteJobRequestStatus=async (req, res)=>{
    try{
        const data = await manage.deleteJobRequestStatus(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}

module.exports = {
    toGetJobRequestStatusList,
    toPostJobRequestStatus,
    toUpdateJobRequestStatus,
    toDeleteJobRequestStatus
}