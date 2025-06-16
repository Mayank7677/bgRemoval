const express = require("express");
const userController = require("../controllers/UserControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.post("/webhooks", userController.clerkWebhook);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/check-credits", auth, userController.userCredits);
router.get("/checkAuth", auth, userController.checkAuth);
router.get("/logout", auth, userController.logout);

router.post('/pay-razor' , auth , userController.paymentRazorpay)
router.post('/verify-razor', auth, userController.verifyRazorpay)

router.post("/forgotPass", userController.forgotPass);
router.post("/sendOtp", userController.checkEmailSendOtp);
router.post("/verifyOtp", userController.verifyOtp);

module.exports = router; 
 