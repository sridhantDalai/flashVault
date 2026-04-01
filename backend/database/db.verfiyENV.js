const User = require("./db.schema.js");

const verifyEnvKey = async (req, res) => {
  try {
    const { key } = req.body;

    // 1️⃣ Check empty
    if (!key) {
      return res.status(400).json({ message: "Env Key required" });
    }

    // 2️⃣ Find user by envKey
    const user = await User.findOne({ envKey: key });

    // 3️⃣ If not found
    if (!user) {
      return res.status(404).json({ message: "Invalid Env Key ❌" });
    }

    // 4️⃣ If found → success
    return res.json({
      success: true,
      message: "Access Granted ✅",
      user: {
        name: user.name,
        email: user.email,
        lockerRoom: user.lockerRoom
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { verifyEnvKey };