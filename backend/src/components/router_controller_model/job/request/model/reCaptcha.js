const ReCaptchaV2 = require('express-recaptcha').RecaptchaV2;
const axios = require('axios')
const options = {'theme':'dark'};

    const verify = async (req,res,next)=>{
        try{
            console.log(req.query)
            console.log(req.body)
            if ('g-recaptcha-response' in req.body || 'g-recaptcha-response' in req.body ) {
                const responseRecaptcha = req.query['g-recaptcha-response'] || req.body['g-recaptcha-response']
                console.log(responseRecaptcha)
                const resultRecaptcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?response=${responseRecaptcha}&secret=6LfOQ-4ZAAAAAEKE92rTSdegNuSdtzhsA6AXMlb2`)
                console.log(resultRecaptcha.data)
                if (resultRecaptcha.data.success) next()
                else res.status(301).send('invalid recaptcha')
            }
            else {
                res.status(408).send('recaptcha not found')
            }
        }
        catch (e) {
            res.status(401).send('Error')
        }
    }

module.exports = {verify}//new ReCaptchaV2('6LfOQ-4ZAAAAACOFvjKDgtEwPjLqX3CdCPgTbTpL', '6LfOQ-4ZAAAAAEKE92rTSdegNuSdtzhsA6AXMlb2', options)