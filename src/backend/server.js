
const express = require("express")
const { PORT, show, UI_PORT } = require("./components")
const router = require("./router.js")
const app = express()
require("dotenv").config()
const cors = require("cors")

const coresOption = {
    origin : "*",
    method : ["GET POST PUT DELETE"],
    credentials : true,
}

app.use(cors(coresOption))
app.use(express.json())

app.use("/",router)

app.listen(PORT,()=>{
    show(`live at http://localhost:${PORT}`)
})