const CheckExist = require('../../../lib/CheckFields')

class AuthenticationCheckFieldsExist extends CheckExist{
    checkFieldsSignIn = async (req, res, next)=> {
        const fields = ['username', 'password']
        const response = this.__checkExist(req.body,fields)
        if(response)    next()
        else            res.status(403).send()
    }
}
module.exports = new AuthenticationCheckFieldsExist()