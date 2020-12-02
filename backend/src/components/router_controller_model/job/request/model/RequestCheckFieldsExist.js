const CheckExist = require('../../../../lib/CheckFields')

class RequestCheckFieldsExist extends CheckExist{

    checkPost =async(req, res, next)=> {
        const result = await this.checkFieldsPost(req.query, {
            fieldsRequired : ['jobVacancyId', 'name', 'happyDate', 'phoneNumber', 'sex'],
            fieldsNotRequired : ['email','resumeText','resumeFilePath']
        })
        if(result.checkExist.error === false && result.checkNull.error === false)    next()
        else res.status(400).json(result)
    }
}
module.exports = new RequestCheckFieldsExist()