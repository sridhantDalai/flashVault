
const express = require("express")
const router = express.Router()

const {checkApp} = require("../backend/testing/check.js")
const upload = require("./testing/middlewareMulter.js")

router.post("/check", upload.single("file") , checkApp )

module.exports = router