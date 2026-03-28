
const express = require("express")
const { PORT, show, UI_PORT } = require("./components.js")
const router = require("./router.js")
const app = express()
require("dotenv").config()
const cors = require("cors")

const coresOption = {
    origin : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}

app.use(cors(coresOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/",router)

app.listen(PORT,()=>{
    show(`live at http://localhost:${PORT}`)
})