const CheckExist = require('../../../../lib/CheckFields')

class RequestCheckFieldsExist extends CheckExist{
    checkFieldsPost =async(req, res, next)=> {
        const fields = ['jobVacancyId', 'name', 'happyDate', 'phoneNumber', 'sex', 'email', 'resumeText', 'resumeFilePath']
        const response = this.__checkExist(req.query,fields)
        if(response)    next()
        else res.status(403).send()
    }

}
module.exports = new RequestCheckFieldsExist()