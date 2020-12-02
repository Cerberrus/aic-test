const connectionDataBase = require('../../../database/DataBase')
const argon = require('argon2')
const jwt = require('jsonwebtoken')

const signIn=async ({body,headers,connection})=>{
    try {
        const {username, password} = body
        const forwarded = headers['x-forwarded-for']
        const ip = forwarded ? forwarded.split(/, /)[0] : connection.remoteAddress
        console.log(ip)

        const [user] = await connectionDataBase.execute('select * from admin where login = ?', [username])

        if(await argon.verify(user[0].password, password)){
            return createJWT({id: user[0].id, name:user[0].name,ip, type: 'admin'})
        }
        else return false
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const createJWT=({id,name,ip,type})=>{
    return jwt.sign(
        {id, name,ip, type},
        process.env.JWT_SECURY_KEY,
        {expiresIn: process.env.JWT_TIMEOUT})
}

const postAdmin= async (name, login, password)=>{
    const passwordHash = await argon.hash(password)
    await connection.execute('insert into Admin(name, login, password) values(?,?,?)', [name, login, passwordHash])
}

module.exports = {
    postAdmin,
    signIn
}