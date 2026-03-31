// checkApp.js
const { show } = require("../components.js");
const cloudinary = require("./upload.cloudinary.js"); // Fixed typo in filename
const fs = require("fs");

const UploadController = async (req, res) => {
    try {
        const file = req.file;
        const username = req.body.username || "default";

        show(req.body.username)
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const folderPath = `Uploads/${username}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: folderPath,
        });

        // OPTIONAL: Delete the local file after successful upload to Cloudinary
        fs.unlinkSync(file.path); 

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            cloudinary_url: result.secure_url,
        });
        
    } catch (error) {
        console.error("Upload Error:", error);
        // If file exists locally but upload failed, clean up the local file
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

module.exports = { UploadController };