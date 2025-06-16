const jwt = require("jsonwebtoken");

exports.generateToken = (email, res) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // only over HTTPS
    sameSite: "None", // because frontend and backend are on different domains
  });

  return token;
};
 