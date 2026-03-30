
const express = require("express")
const { PORT, show, UI_PORT, sessionID } = require("./components.js")
const router = require("./router.js")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connectDB = require("./database/db.connection.js")
const session = require("express-session")
const passport = require("./auth/auth.controller.js")


const coresOption = {
    origin : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}

app.use(cors(coresOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connectDB()

app.use(session({
    secret: sessionID,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/",router)


app.listen(PORT,()=>{
    show(`live at http://localhost:${PORT}`)
})