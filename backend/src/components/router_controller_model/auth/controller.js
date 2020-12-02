const authentication = require('./model/Authentication')

const toSignIn = async (req,res)=>{
    try {
        const jwt = await authentication.signIn(req)
        if(jwt !== false)  res.status(201).cookie('auth', jwt).json({message: "jwt token создан"})
        else  res.status(403).send()
    }
    catch (e) {
        res.status(402).json(e)
    }
}
const toSignOut = (req,res)=>{
    try {
        res.status(200).clearCookie('auth').json({message: "jwt token уничтожен"})
    } catch (e) {
        res.status(402).send()
    }
}

module.exports = {
    toSignIn,
    toSignOut
}