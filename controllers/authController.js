const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            await User.create({email:email, password:hashedPassword});
            return res.status(200).send({message:"User Created Succesfully"});
        }
        return res.status(400).send({error:"User Already Exists"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
};

exports.login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            const check = await bcrypt.compare(password,user.password);
            if(check){
                const token = jwt.sign({email:user.email},SECRET_KEY,{
                    expiresIn:'1h'
                });
                return res.status(200).json({
                    message:"User Found",
                    auth_token:token
                });
            }
        }
        return res.status(404).json({error:"Username or Password Invalid"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}