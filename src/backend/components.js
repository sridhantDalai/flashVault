
require("dotenv").config()

const show = (data) => {
    console.log(data)
}

const PORT = process.env.PORT
const UI_PORT = process.env.UI_PORT

const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.API_KEY
const apiSecrect = process.env.API_SECRECT

const mongooseURI = process.env.MONGOOSE_URI

const clientID = process.env.CLIENT_ID
const clientSec = process.env.CLIENT_SECRET
const sessionID = process.env.SESSION_ID

module.exports = {show,PORT,UI_PORT,cloudName,apiKey,apiSecrect,mongooseURI,clientID,clientSec,sessionID}