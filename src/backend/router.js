
const express = require("express")
const router = express.Router()

const { UploadController } = require("./uploads/upload.controller.js")
const upload = require("./uploads/upload.maltar.js")

router.post("/check", upload.single("file") , UploadController )

module.exports = router