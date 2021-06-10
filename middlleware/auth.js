import jwt from "jsonwebtoken";
import config from "config";

function auth(req,res,next) {
    const token = req.header('auth')
    if(!token) return res.status(401).send('Access Denied, No Token Provided')
    try {
    const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        req.user = decoded
        console.log(decoded)
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
} 

export default auth;