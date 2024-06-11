const Mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const connectDB =  async ()=>{
    try{
        await Mongoose.connect(MONGO_URI);
        console.log("Connected to database");
    }
    catch(err){
        console.log("Error in connection");
        process.exit(1);
    }
}

module.exports=connectDB;