const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = async (req,res,next)=>{
    const auth_token = req.headers['authorization'];
    if(!auth_token){
        return res.status(404).json({error:"Access Denied"});
    }
    try{
        const verify = jwt.verify(auth_token,SECRET_KEY);
        req.user=verify;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
} 