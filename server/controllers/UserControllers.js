const userModel = require("../models/UserSchema");
const { Webhook } = require("svix");

exports.clerkWebhook = async (req, res) => {
  console.log(req.body)
  try {
    // creating svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

    await whook.verify(JSON.stringify(req.Webhook), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": { 
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.status(200).json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.status(200).json({});
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.status(200).json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log("error in clerkWebhook : ", error);
    res.json({ success: false, message: error.message });
  }
};

exports.userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });

    res.status(200).json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log("error in userCredits : ", error);
    res.json({ success: false, message: error.message });
  }
};
