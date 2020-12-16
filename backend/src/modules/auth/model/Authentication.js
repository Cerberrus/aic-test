const argon = require("argon2");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const userDataBase = require('./UserDataBase')

const paper = 'Afewf4!fFA$3g33%2dFE&AFRG@34g3fe'

const signIn = async ({body, headers, connection}) => {
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
        }
    } catch (e) {
        console.error(e);
        return false;
    }
};

const createJWT = ({id, name, ip, type}) => {
    return jwt.sign({id, name, ip, type}, process.env.JWT_SECURY_KEY, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};
module.exports = {
    signIn,
};