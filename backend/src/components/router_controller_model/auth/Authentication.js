const connection = require('../../database/DataBase')
const argon = require('argon2')
const jwt = require('jsonwebtoken')

const signIn=async ({login, password})=>{
    try {
        const [user] = await connection.execute('select * from admin where login = ?', [login])
        if(await argon.verify(user[0].password, password)){
            return jwt.sign(
                {id: user[0].id, name:user[0].name, type: 'admin'},
                process.env.JWT_SECURY_KEY,
                {expiresIn: process.env.JWT_TIMEOUT})
        }
        else return false
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const postAdmin= async (name, login, password)=>{
    const passwordHash = await argon.hash(password)
    await connection.execute('insert into Admin(name, login, password) values(?,?,?)', [name, login, passwordHash])
}

module.exports = {
    postAdmin,
    signIn
}