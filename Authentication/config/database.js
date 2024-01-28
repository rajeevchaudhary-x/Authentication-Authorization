const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = ()=>{
 mongoose.connect(process.env.DATABASE_URL)
 .then(()=>{
    console.log("Db connected Sucessfully");
 })
 .catch((err)=>{
    console.log("Error in connecting");
    console.error(err);
    process.exit(1);
 })
}