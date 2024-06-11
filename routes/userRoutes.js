const router = require('express').Router();

router.get('/profile',(req,res)=>{
    res.send("hi");
})

module.exports=router;