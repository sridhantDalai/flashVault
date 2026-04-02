const cloudinary = require("../uploads/upload.cloudinary.js");

const getImages = async (req, res) => {
  try {
    const envKey = req.body.envKey || "default"; // ⚡ frontend se aayega

    const result = await cloudinary.search
      .expression(`folder:Uploads/${envKey}`) // 🔥 dynamic folder
      .execute();

    res.json(result.resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getImages };