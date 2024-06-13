const Mongoose = require('mongoose');

const docSchema = Mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    collaborators:{
        type:[String],
        default:[]
    },
    content:{
        type:String,
        default:""
    }
});

module.exports = Mongoose.model('Document',docSchema);