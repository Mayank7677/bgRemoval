const axios = require("axios");
const FormData = require("form-data");
const UserSchema = require("../models/UserSchema");

exports.removeBg = async (req, res) => {
    // console.log(req.user);
    // console.log(req.files)
    // console.log(req.files.image)
  try {
    const user = await UserSchema.findById(req.user._id);

    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const image = req.files?.image;
    if (!image) return res.status(400).json({ error: "No image uploaded" });

    const form = new FormData();
    form.append("image_file", image.data, image.name);

    const response = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer", // so you get the image back
      }
    );

    await UserSchema.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    console.log('-------------------------------------------------')
    console.log(response.data)
    res.set("Content-Type", "image/png");
    res.send(response.data); // returns image to frontend
  } catch (err) {
    console.error("Remove BG Error:", err.message);
    res.status(500).json({ error: "Background removal failed." });
  }
};

exports.upscaleImage = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user._id);

    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const image = req.files?.image;
    if (!image) return res.status(400).json({ error: "No image uploaded" });

    const form = new FormData();
    form.append("image_file", image.data, image.name);
    form.append("target_width", 2048);
    form.append("target_height", 2048);

    const response = await axios.post(
      "https://clipdrop-api.co/image-upscaling/v1/upscale",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    await UserSchema.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.set("Content-Type", "image/png");
    res.send(response.data);
  } catch (err) {
    console.error("Upscaling Error:", err.message);
    res.status(500).json({ error: "Image upscaling failed." });
  }
};
