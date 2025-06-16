const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
  otp: {
    type: Number,
  },
  otpTimer: {
    type: Number,
  },
});

module.exports = mongoose.model("users", userSchema);
