const CheckExist = require('../../../lib/CheckFields')

class InstagramCheckFieldsExist extends CheckExist{
    checkFieldsPost =async (req, res, next)=> {
        const fields = ['username', 'password']
        const response = this.__checkExist(req.body,fields)
        if(response)    next()
        else res.status(403).send()
    }
}
module.exports = new InstagramCheckFieldsExist()