const jwt = require('jsonwebtoken')

const usersMiddleware = (req,res,next)=>{
    try{
        let token = req.cookies?.jwt

        if(!token){
            throw('Please Login')
        }
        jwt.verify(token,process.env.JWTKEY)
        next()
    }catch(er){
        console.log(er);
        res.status(401).json(er)
    }
}

module.exports = usersMiddleware