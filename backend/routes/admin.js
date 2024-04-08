// Load environment variables
require('dotenv').config();

const express = require("express");
const Admin = require("../models/AdminSchema");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchadmin = require("../middleware/fetchadmin");
const privatekey = process.env.SECRET_KEY;

//Creating admin account
router.post(
  "/createadmin",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, admin already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      admin = await Admin.create({
        email: req.body.email,
        password: hashedPassword,
      });

      const token = jwt.sign({ admin: { id: admin.id } }, privatekey);
      //   console.log(token);

      return res.json({ success: true, token });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something Went Wrong" });
    }
  }
);

//admin login
router.post(
  "/adminlogin",
  [
    body("email", "please enter email").isEmail(),
    body("password", "password must contain 8 letters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please enter valid details" });
      }

      const comparePassword = await bcrypt.compare(password, admin.password);
      // Pass the plaintext password and the hashed password to bcrypt.compare

      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please enter correct details" });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const jwtdata = jwt.sign(data, privatekey);
      success = true;
      res.json({ success, jwtdata });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "error occurred" });
    }
  }
);

router.put("/updatepassword", fetchadmin, async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).send("admin not found");
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedNewPassword;
    await admin.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating password" });
  }
});

router.post("/getadmin", fetchadmin, async (req, res) => {
  try {
    adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error occcurred" });
  }
});

module.exports = router;
