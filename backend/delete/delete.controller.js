const cloudinary = require("../uploads/upload.cloudinary.js")

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: "public_id required" });
    }

    // IMPORTANT: full path pass kar
    const result = await cloudinary.uploader.destroy(public_id);

    res.json({ success: true, result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { deleteImage };