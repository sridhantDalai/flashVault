
const express = require("express")
const router = express.Router()

const { UploadController } = require("./uploads/upload.controller.js")
const upload = require("./uploads/upload.maltar.js")
const createUser = require("./database/db.controller.js")
const passport = require("./auth/auth.controller.js")

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect("http://localhost:5173/key");
    }
)

router.post("/check", upload.single("file") , UploadController )
router.post("/db" , createUser )

module.exports = router