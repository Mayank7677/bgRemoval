const express = require('express');
const userController = require('../controllers/UserControllers');

const router = express.Router();

router.post('/webhooks' , userController.clerkWebhook)

module.exports = router;