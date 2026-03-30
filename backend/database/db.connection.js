
const mongoose = require("mongoose")
const { mongooseURI, show } = require("../components.js")

require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(mongooseURI)
    try{
        show("DB Connected !!")
    }
    catch(err){
        show(err)
        process.exit(1)
    }
}

module.exports = connectDB