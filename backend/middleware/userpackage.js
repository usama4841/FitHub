const jwt = require('jsonwebtoken');
const Purchase = require('../models/PurchaseSchema');
const privatekey = process.env.SECRET_KEY;

const fetchpackage = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, privatekey);
    const purchase = await Purchase.findOne({ userId: decoded.user.id }); // Assuming userId is used to find the purchase
    if (!purchase) {
      return res.status(401).json({ error: 'No purchase found for this user' });
    }
    req.packageId = purchase.packageId; // Attach packageId to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = fetchpackage;
