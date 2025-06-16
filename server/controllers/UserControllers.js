require("dotenv").config();
const userModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../configs/generateToken");
const razorpay = require("razorpay");
const TransactionModel = require("../models/TransactionModel");
const sentOtpEmail = require("../configs/otpMail");

// exports.clerkWebhook = async (req, res) => {
//   console.log(req.body);
//   try {
//     // creating svix instance with clerk webhook secret
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

//     await whook.verify(req.body, {
//       "svix-id": req.headers["svix-id"],
//       "svix-signature": req.headers["svix-signature"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//     });

//     const payload = JSON.parse(req.body);
//     const { data, type } = payload;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.create(userData);
//         res.status(200).json({});
//         break;
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
//         res.status(200).json({});
//         break;
//       }

//       case "user.deleted": {
//         await userModel.findOneAndDelete({ clerkId: data.id });
//         res.status(200).json({});
//         break;
//       }

//       default:
//         break;
//     }
//   } catch (error) {
//     console.log("error in clerkWebhook : ", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// exports.clerkWebhook = async (req, res) => {
//   console.log('---------------------------------------')
//   console.log(req.body)
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

//     // Verify signature using raw body
//     await whook.verify(req.body, {
//       "svix-id": req.headers["svix-id"],
//       "svix-signature": req.headers["svix-signature"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//     });

//     const payload = JSON.parse(req.body);
//     const { data, type } = payload;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };
//         await userModel.create(userData);
//         res.status(200).json({});
//         break;
//       }
//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };
//         await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
//         res.status(200).json({});
//         break;
//       }
//       case "user.deleted": {
//         await userModel.findOneAndDelete({ clerkId: data.id });
//         res.status(200).json({});
//         break;
//       }
//       default:
//         res.status(400).json({ message: "Unhandled event type" });
//         break;
//     }
//   } catch (error) {
//     console.log("error in clerkWebhook : ", error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// exports.clerkWebhook = async (req, res) => {
//   try {
//     // Step 1: Use rawBody instead of req.body
//     const payload = req.body; // this is Buffer because express.raw is used
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-signature": req.headers["svix-signature"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//     };

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
//     const event = whook.verify(payload, headers);

//     const { data, type } = event;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.create(userData);
//         break;
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           firstName: data.first_name,
//           lastName: data.last_name,
//           photo: data.image_url,
//         };

//         await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
//         break;
//       }

//       case "user.deleted": {
//         await userModel.findOneAndDelete({ clerkId: data.id });
//         break;
//       }

//       default:
//         console.log("Unhandled event type:", type);
//     }

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !lastName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    generateToken(newUser.email, res);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error in signup", error);
    return res.status(500).json({
      success: false,
      message: "error in signup",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(checkUser.email, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: checkUser,
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({
      success: false,
      message: `error in login ${error}`,
    });
  }
};

exports.checkAuth = async (req, res) => {
  // console.log(process.env.RAZORPAY_KEY_ID, "hyyyy", process.env.RAZORPAY_KEY_SECRET);
  res.json({ message: "User is authenticated", user: req.user });
};

exports.userCredits = async (req, res) => {
  // console.log(req.user)
  try {
    const { id } = req.user._id;
    const userData = await userModel.findById(req.user._id);
    // console.log(userData);

    res.status(200).json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log("error in userCredits : ", error);
    res.json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({
      success: false,
      message: "error in logout",
    });
  }
};

exports.checkEmailSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    checkUser.otp = otp;
    checkUser.otpTimer = Date.now() + 5 * 60 * 1000;
    await checkUser.save();

    await sentOtpEmail(checkUser.email, otp, checkUser.firstName);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("error in checkEmailSendOtp : ", error);
    res.json({ success: false, message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (Number(user.otp) !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpTimer < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    sole.log("error in verifyOtp : ", error);
    res.json({ success: false, message: error.message });
  }
};

exports.forgotPass = async (req, res) => {
  try {
    const { newPass, email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);

    user.password = hashedPassword;
    user.otp = null;
    user.otpTimer = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("error in forgotPass", error);
    return res.status(500).json({
      success: false,
      message: "error in forgotPass",
    });
  }
};


// intializing gateway
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// api to make payment for credits
exports.paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;

    const userData = await userModel.findById(req.user._id);

    if (!userData || !planId) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 100;
        break;
    }

    date = Date.now();

    // creating Transaction

    const transactionData = {
      userId: userData._id,
      credits,
      plan,
      amount,
      date,
    };

    const newTransaction = await TransactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.json({ success: false, message: error });
      }

      res.json({ success: true, order });
    });
  } catch (error) {
    console.log("error in paymentRazorpay : ", error);
    res.json({ success: false, message: error.message });
  }
};

// to verify razorpay payment
exports.verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await TransactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Failed" });
      }

      // adding credits in user data
      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });

      // making the payment true
      await TransactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "Credits Added" });
    }
  } catch (error) {
    console.log("error in verifyRazorpay : ", error);
    res.json({ success: false, message: error.message });
  }
};
