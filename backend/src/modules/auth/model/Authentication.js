const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userDataBase = require('./UserDataBase')

const signIn = async ({body, headers, connection}) => {
    try {
        const {username, password} = body;
        const forwarded = headers["x-forwarded-for"];
        const ip = forwarded ? forwarded.split(/, /)[0] : connection.remoteAddress;
        const user = await userDataBase.get(username)
        if (!!user) {
            return  await argon.verify(user.password, password)
                ?   await createJWT({id: user.id, name: user.name, ip, type: "admin",})
                :   false
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};

const createJWT = ({id, name, ip, type}) => {
    return jwt.sign({id, name, ip, type}, process.env.JWT_SECURY_KEY, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};

const postAdmin = async (name, username, password) => {
    const passwordHash = await argon.hash(password);
    await userDataBase.post(name,username, passwordHash)
};

module.exports = {
    postAdmin,
    signIn,
};