
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
    origin : "https://flash-vault-beta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}

app.set("trust proxy", 1);

app.use(cors(coresOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connectDB()


app.use(session({
secret: sessionID,
    resave: true,              // Isko true kar de temporarily
    saveUninitialized: false,
    proxy: true,               // Railway ke liye mandatory
    cookie: {
        secure: true,          // HTTPS pe ho toh true hi rahega
        sameSite: "none",      // Cross-domain ke liye "none" zaroori hai
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/",router)


app.listen(PORT,()=>{
    show(`live at http://localhost:${PORT}`)
})