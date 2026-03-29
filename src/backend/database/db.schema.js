
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
        unique : false,
    },
    envKey : {
        type : String,
        required : true,
        unique : true,
    },
    dateCreated : {
        type : String,
        required : true,
        unique : false,
    },
    lockerRoom : {
        type : String,
        required : true,
        unique : true,
    },        
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel