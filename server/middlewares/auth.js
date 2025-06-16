const jwt = require("jsonwebtoken");
const userModel = require("../models/UserSchema");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("token not found");
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const user = await userModel.findOne({email : decode.email}).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
};
