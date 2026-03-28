const { cloudinary } = require("./cloudinary.js"); // Import the configured cloudinary
const fs = require("fs");

const checkApp = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file provided" });
        }

        // Define your custom folder path: users/username/filename
        // You can get 'userId' or 'username' from req.body or req.user
        const folderPath = `users/${req.body.userId || 'default'}`; 

        // Upload to Cloudinary with the custom folder
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: folderPath, 
            resource_type: "auto",
            public_id: Date.now() + "-" + req.file.originalname.split('.')[0]
        });

        // Delete the temporary local file after Cloudinary upload
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Return the same response format to keep your frontend working
        res.json({
            success: true,
            message: "Successfully uploaded file!",
            fileUrl: result.secure_url, 
            public_id: result.public_id 
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

module.exports = { checkApp };