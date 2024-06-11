const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
        type : String,
        required: true
    }
});

module.exports = Mongoose.model('User',userSchema);