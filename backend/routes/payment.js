const express = require('express');
const { isauthenticatedUser } = require('../middlewares/authenticate');
const { processPayment, sendStripeApi } = require('../controllers/paymentController');
const router = express.Router();

router.route('/payment/process').post(processPayment);
router.route("/stripeapi").get(isauthenticatedUser,sendStripeApi)
module.exports = router;