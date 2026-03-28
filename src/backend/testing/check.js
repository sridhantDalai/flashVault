
const { show } = require("../components")
const fs = require("fs")


const checkApp = (req,res) => {
    show(req.file);

    res.json({
        success: true,
        message: "Successfully uploaded file!",
        fileUrl: req.file.path,   // Cloudinary URL
        public_id: req.file.filename
    });
}

module.exports = {checkApp}