const cloudinary = require("cloudinary").v2;

const getImages = async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:Uploads/default")
      .execute();

    res.json(result.resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getImages };