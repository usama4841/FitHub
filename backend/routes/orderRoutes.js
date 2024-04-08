// orderRoutes.js

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Razorpaykey = process.env.RAZORPAY_KEY_ID;
const Razorpaysecret = process.env.RAZORPAY_SECRET;

// Initialize Razorpay client with your API key and secret
const razorpay = new Razorpay({
  key_id: Razorpaykey,
  key_secret: Razorpaysecret,
});

// Route to create a new order
router.post('/order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // Create order using Razorpay API
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
  
});

module.exports = router;
