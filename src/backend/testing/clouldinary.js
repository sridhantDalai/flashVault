const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // 👈 Add this line
const multer = require("multer");
const { cloudName, apiKey, apiSecrect } = require("../components.js");

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecrect, // Fixed typo: 'api_secrect' -> 'api_secret'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // You need to return an object. 
        // Added curly braces and removed the unnecessary return() parentheses syntax.
        return {
            folder: `users/${req.body.userId || 'default'}`, 
            public_id: Date.now() + "-" + file.originalname.split('.')[0], // Removed extension from ID
            resource_type: "auto"
        };
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

