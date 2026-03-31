
const express = require("express")
const router = express.Router()

const { UploadController } = require("./uploads/upload.controller.js")
const upload = require("./uploads/upload.maltar.js")
const createUser = require("./database/db.controller.js")
const passport = require("./auth/auth.controller.js")
const { show } = require("./components.js")
const { getImages } = require("./retrive/retrive.controller.js")

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback",
passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Bina save kiye redirect mat kar
        req.session.save((err) => {
            if (err) {
                console.log("Session save error:", err);
                return res.redirect("/");
            }
            res.redirect("https://flash-vault-beta.vercel.app/load");
        });
    }
)

router.get("/me" , (req,res) => {
    show(req.user)
    if (req.isAuthenticated()){
        return (
            res.json({
                loggedIn : true ,
                user : req.user
            })
        )
    }else{
        return(
            res.status(401).json({
                loggedIn : false
            })
        )
    }
})

router.post("/check", upload.single("file") , UploadController )
router.get("/getImg",getImages)
router.post("/db" , createUser )

module.exports = router