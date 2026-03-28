const cloudinary = require("cloudinary").v2;
const { cloudName, apiKey, apiSecrect } = require("../components.js");

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecrect, 
});

module.exports = cloudinary;

