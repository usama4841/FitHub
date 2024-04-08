const express = require('express');
const router = express.Router();
const { createOrder } = require('../middleware/paymentMiddleware');

// Middleware for creating an order
router.post('/orders', createOrder, (req, res) => {
    const order = res.locals.order;
    res.json(order);
});

module.exports = router;