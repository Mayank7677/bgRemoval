const express = require("express");
const imageController = require("../controllers/ImageController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/remove-bg", auth, imageController.removeBg);
router.post("/upscale", auth, imageController.upscaleImage);

module.exports = router;
