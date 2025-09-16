const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/envConfig');

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    try{
        jwt.verify(token,jwtSecret,(err,user)=>{
            if(err) return res.sendStatus(401);
            req.user = user;
            next();
        })
    }catch(err){
        return res.status(401).json({ message: "Invalid token" }); 
    }
}

module.exports = {
    authenticateToken,
}