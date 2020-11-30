const CheckExist = require('../../../../lib/CheckFields')

class VacancyCheckFieldsExist extends CheckExist{

    checkFieldsPost =async(req, res, next)=> {
        const fields = ['title', 'imageDescription']
        const response = this.__checkExist(req.query,fields)
        if(response)    next()
        else            res.status(403).send()
    }
}
module.exports = new VacancyCheckFieldsExist()