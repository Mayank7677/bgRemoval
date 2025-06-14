const express = require("express");
const userController = require("../controllers/UserControllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/webhooks", userController.clerkWebhook);
router.get("/credits", auth, userController.userCredits);

module.exports = router;
