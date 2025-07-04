// MUST be the very first lines
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config/config.env") });



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Will crash if key is undefined
const catchasyncerror = require("../middlewares/catchasyncerror");

// your exports...


exports.processPayment  = catchasyncerror(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripeApi  = catchasyncerror(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})
