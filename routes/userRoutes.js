const router = require('express').Router();
const {verifyToken} = require('../middleware/authMiddleware');

router.get('/profile',verifyToken,(req,res)=>{
    res.status(200).json({message:"Logged In"});
})

module.exports=router;