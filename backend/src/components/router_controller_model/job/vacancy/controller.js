const manage = require('./model/ManageVacancy')

const toGetJobVacancyList=async (req, res)=>{
    try{
        const data = await manage.getJobVacancyList()
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toGetJobVacancy=async (req, res)=>{
    try{
        const data = await manage.getJobVacancy(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toPostJobVacancy=async (req, res)=>{
    try{
        const data = await manage.postJobVacancy(req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toUpdateJobVacancy=async (req, res)=>{
    try{
        const data = await manage.updateJobVacancy(req.params, req.query)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}
const toDeleteJobVacancy=async (req, res)=>{
    try{
        const data = await manage.deleteJobVacancy(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send
    }
}

module.exports = {
    toGetJobVacancyList,
    toGetJobVacancy,
    toPostJobVacancy,
    toUpdateJobVacancy,
    toDeleteJobVacancy
}