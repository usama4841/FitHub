// paymentMiddleware.js

const Razorpay = require("razorpay");
const razorpayKeyId = "rzp_test_3F0ixPTxgqYkKL"
const  razorpayKeySecret = "jal2GHme35ERfqul6GloVDhV";

const createOrder = async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const options = {
      amount: 50000, // Sample amount (you can modify this according to your logic)
      currency: "INR",
      receipt: "receipt_order_74394", // Sample receipt ID (you can generate this dynamically)
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    res.locals.order = order;
    next();
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrder };