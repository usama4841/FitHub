// Load environment variables
require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const privatekey = process.env.SECRET_KEY;

const fetchuser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, privatekey);
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user; // Attach user data to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = fetchuser;
