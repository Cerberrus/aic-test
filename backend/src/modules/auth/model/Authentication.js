const argon = require("argon2");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const userDataBase = require('./UserDataBase')

const paper = process.env.PASSWORD_PAPER    //Секретный ключ для паролей

const signIn = async ({body, headers, connection}) => { //Метод для входа пользователя
    try {
        const {username, password} = body;
        const forwarded = headers["x-forwarded-for"];
        const ip = forwarded ? forwarded.split(/, /)[0] : connection.remoteAddress;
        const user = await userDataBase.get(username)
        if (!!user) {
            const hmac = await crypto.createHmac('sha256', paper)
                .update(password)
                .digest('hex')
            return  await argon.verify(user.password, hmac)
                ?   await createJWT({id: user.id, name: user.name, ip, type: "admin",})
                :   false
        }else {
            return false
        }
    } catch (e) {
        console.error(e);
        return false;
    }
};

const createJWT = ({id, name, ip, type}) => {   //Создаем JWT код
    return jwt.sign({id, name, ip, type}, process.env.JWT_SECURY_KEY, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};
module.exports = {
    signIn,
};