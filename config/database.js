const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/Book');
        console.log("The database is connected");
    }catch(err){
        console.log("Unable to connect",err)
    }
}
module.exports = connectDB
