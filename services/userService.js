const User = require('../models/user');

const getUserProfile = async (userEmail)=>{
    try{
        const user = await User.findOne({email:userEmail});
        return user;
    }
    catch(err){
        return err;
    }
}

module.exports=getUserProfile;