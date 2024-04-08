// Load environment variables
require("dotenv").config();

// Require necessary modules
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");
const fetchuser = require("../middleware/fetchuser");
const privatekey = process.env.SECRET_KEY;

// Route to create a new user
router.post(
  "/createuser",
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

      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, user already exists" });
      }
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Construct the user object
      let userObject = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
      };

      // Create the user
      user = await User.create(userObject);
      // Sign JWT token
      const token = jwt.sign({ user: { id: user.id } }, privatekey);

      return res.json({ success: true, token });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something Went Wrong" });
    }
  }
);

//user login
router.post(
  "/login",
  [
    body("email", "please enter email").isEmail(),
    body("password", "password must contain 8 letters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please enter valid details" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please enter correct details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtdata = jwt.sign(data, privatekey);
      //   console.log(jwtdata);
      success = true;
      res.json({ success, jwtdata });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "error occcurred" });
    }
  }
);

// fetch user
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error occcurred" });
  }
});

//fetch all user
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching users" });
  }
});

//fetch users registered in last 7 days
router.get("/usersLast7Days", async (req, res) => {
  try {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
    const users = await User.find({
      joiningDate: { $gte: date7DaysAgo },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching users created in the last 7 days" });
  }
});


//fetch all user between specific dates
router.get("/usersByDate", async (req, res) => {
  try {
    // Extract start and end dates from query parameters
    const { startDate, endDate } = req.query;

    // Ensure both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Both startDate and endDate are required" });
    }

    // Convert startDate and endDate strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Fetch users registered between startDate and endDate
    const users = await User.find({
      joiningDate: { $gte: startDateObj, $lte: endDateObj },
    });

    res.json(users);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching users" });
  }
});

//updating user
router.put("/updateuser", fetchuser, async (req, res) => {
  const { name, email, phone, age, address, city, state } = req.body;

  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  if (email) {
    newUser.email = email;
  }
  if (phone) {
    newUser.phone = phone;
  }
  if (age) {
    newUser.age = age;
  }
  if (address) {
    newUser.address = address;
  }
  if (city) {
    newUser.city = city;
  }
  if (state) {
    newUser.state = state;
  }

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    let updatedUser = await User.findByIdAndUpdate(
      user,
      { $set: newUser },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating user" });
  }
});

//updating gym from admin side
router.put("/updateuserfromadminside/:id", async (req, res) => {
  const { name, email, phone, age, address, city, state } = req.body;

  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  if (email) {
    newUser.email = email;
  }
  if (phone) {
    newUser.phone = phone;
  }
  if (age) {
    newUser.age = age;
  }
  if (address) {
    newUser.address = address;
  }
  if (city) {
    newUser.city = city;
  }
  if (state) {
    newUser.state = state;
  }

  try {
    let userId = await User.findById(req.params.id);
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: newUser },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating user" });
  }
});

// deleting
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    let userId = await User.findById(req.params.id);
    if (!userId) {
      return res.status(404).send("User ID not found in the request");
    }

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).send("User not found");
    }

    let deletedUser = await User.findByIdAndDelete(userId);
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while deleting user" });
  }
});

// Update password
router.put("/updatepassword", fetchuser, async (req, res) => {
  const { password, newPassword } = req.body;

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

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

module.exports = router;
