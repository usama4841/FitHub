// routes/connect.js

const express = require('express');
const router = express.Router();
const ConnectReqSchema = require("../models/ConnectReqSchema");
const { validationResult } = require("express-validator");

router.post(
  "/createconnect",
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      const { cname, cemailaddress, ccontact, cdesc } = req.body;
  
      const connect = await ConnectReqSchema.create({ cname, cemailaddress, ccontact, cdesc });
      return res.json({ success: true, data: connect });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }
);

module.exports = router;
