const userModel = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decode = jwt.decode(token);
    req.body.clerkId = decode.clerkId;

    next();
  } catch (error) {
    console.log("error in auth middleware : ", error);
    res.json({ success: false, message: error.message });
  }
};
