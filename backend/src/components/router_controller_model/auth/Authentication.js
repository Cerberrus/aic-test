const connection = require('../../../database/DataBase')
const argon = require('argon2')
const jwt = require('jsonwebtoken')


const check =async({userJWT})=>{
    try{
        const data = await jwt.decode(userJWT, {complete: true}).payload
        if(data.type === 'admin')   return true
        else                        return false
    }
    catch (e){
        console.error(e)
        return false
    }
}
const signIn=async ({login, password})=>{
    try {
        const [user] = await this.database.execute
        ('select A.admin_id, A.name, A.password ' +
            'from Admin as A ' +
            'where A.login = ?', [login])
        if(await argon.verify(user[0].password, password)){
            return jwt.sign(
                {id: user[0].admin_id, name:user[0].admin_name, type: user[0].role_name},
                process.env.JWT_SECURY_KEY,
                {expiresIn: process.env.JWT_TIMEOUT})
        }
        else return false
    }
    catch (e) {
        return false
    }
}