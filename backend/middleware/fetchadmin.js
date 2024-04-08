// Load environment variables
require('dotenv').config();

// Require necessary modules
const jwt = require("jsonwebtoken");
const privatekey = process.env.SECRET_KEY;

const fetchadmin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "access denied" });
  }
  try {
    const data = jwt.verify(token, privatekey);
    req.admin = data.admin;
    next();
  } catch (error) {
    res.status(401).send({ error: "access denied" });
  }
};
module.exports = fetchadmin;
