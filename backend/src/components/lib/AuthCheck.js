const jwt = require('jsonwebtoken')
const check =async(userJWT)=>{
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
const toCheck = async (req,res,next)=>{
    try{
        if('auth' in req.cookies){
            const response = await check(req.cookies.auth)
            if(response === true) next()
            else res.status(403).send('Error in check')
        }
        else res.status(403).send('Error in check')
    }
    catch (e) {
        res.status(406).send()
    }

}
module.exports = {toCheck}