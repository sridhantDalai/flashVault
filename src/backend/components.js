
require("dotenv").config()

const show = (data) => {
    console.log(data)
}

const PORT = process.env.PORT
const UI_PORT = process.env.UI_PORT

const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.API_KEY
const apiSecrect = process.env.API_SECRECT


module.exports = {show,PORT,UI_PORT,cloudName,apiKey,apiSecrect}