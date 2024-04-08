// Load environment variables
require('dotenv').config();

// Require necessary modules
const express = require("express");
const Gym = require("../models/GymSchema");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const fetchgym = require("../middleware/fetchgym");
const jwt = require("jsonwebtoken");
const privatekey = process.env.SECRET_KEY;

//Creating gym
router.post(
  "/creategym",
  [
    body("gymemail", "Please enter a valid email").isEmail(),
    body("gympassword", "Password must be at least 8 characters long").isLength(
      {
        min: 8,
      }
    ),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      let gym = await Gym.findOne({ gymemail: req.body.gymemail });
      if (gym) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, gym already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.gympassword, salt);

      gym = await Gym.create({
        gymname: req.body.gymname,
        gymemail: req.body.gymemail,
        gympassword: hashedPassword,
        gymphone: req.body.gymphone,
        ownername: req.body.ownername,
        gymaddress: req.body.gymaddress,
        zipcode: req.body.zipcode,
        gymcity: req.body.gymcity,
        gymstate: req.body.gymstate,
      });

      const token = jwt.sign({ gym: { id: gym.id }}, privatekey);
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

//login
router.post(
  "/gymlogin",
  [
    body("gymemail", "Please enter a valid email").isEmail(),
    body("gympassword", "Password must be at least 8 characters long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { gymemail, gympassword } = req.body;
    try {
      let gym = await Gym.findOne({ gymemail });
      if (!gym) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const comparePassword = await bcrypt.compare(gympassword, gym.gympassword);
      if (!comparePassword) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const token = jwt.sign({ gym: { id: gym.id } }, privatekey);
      return res.json({ success: true, jwtdata: token });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

//fetch gym
router.get("/getgym", fetchgym, async (req, res) => {
  try {
    gymId = req.gym.id;
    const gym = await Gym.findById(gymId).select("-gympassword");
    res.send(gym);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error occcurred" });
  }
});

//fetch all gym details
router.get("/allgyms", async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.json(gyms);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching gyms" });
  }
});

router.get("/gymsLast7Days", async (req, res) => {
  try {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
    const gyms = await Gym.find({
      joiningDate: { $gte: date7DaysAgo },
    });

    res.json(gyms);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while fetching gyms created in the last 7 days" });
  }
});

//fetch all gyms registered between specific dates
router.get("/gymsByDate", async (req, res) => {
  try {
    // Extract start and end dates from query parameters
    const { startDate, endDate } = req.query;

    // Ensure both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Both startDate and endDate are required" });
    }

    // Convert startDate and endDate strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Fetch gyms registered between startDate and endDate
    const gyms = await Gym.find({
      joiningDate: { $gte: startDateObj, $lte: endDateObj }
    });

    res.json(gyms);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error occurred while fetching gyms" });
  }
});

//updating gym
router.put("/updategym/:id", fetchgym, async (req, res) => {
  const {
    gymname,
    gymemail,
    gymphone,
    ownername,
    gymaddress,
    zipcode,
    gymcity,
    gymstate,
  } = req.body;

  const newGym = {};
  if (gymname) {
    newGym.gymname = gymname;
  }
  if (gymemail) {
    newGym.gymemail = gymemail;
  }
  if (gymphone) {
    newGym.gymphone = gymphone;
  }
  if (ownername) {
    newGym.ownername = ownername;
  }
  if (gymaddress) {
    newGym.gymaddress = gymaddress;
  }
  if (zipcode) {
    newGym.zipcode = zipcode;
  }
  if (gymcity) {
    newGym.gymcity = gymcity;
  }
  if (gymstate) {
    newGym.gymstate = gymstate;
  }

  try {
    let gymId = req.gym.id;
    let updatedGym = await Gym.findByIdAndUpdate(
      gymId,
      { $set: newGym },
      { new: true }
    );
    res.json(updatedGym);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating gym details" });
  }
});

router.put("/updategymfromadmin/:id", async (req, res) => {
  const {
    gymname,
    gymemail,
    gymphone,
    ownername,
    gymaddress,
    zipcode,
    gymcity,
    gymstate,
  } = req.body;

  const newGym = {};
  if (gymname) {
    newGym.gymname = gymname;
  }
  if (gymemail) {
    newGym.gymemail = gymemail;
  }
  if (gymphone) {
    newGym.gymphone = gymphone;
  }
  if (ownername) {
    newGym.ownername = ownername;
  }
  if (gymaddress) {
    newGym.gymaddress = gymaddress;
  }
  if (zipcode) {
    newGym.zipcode = zipcode;
  }
  if (gymcity) {
    newGym.gymcity = gymcity;
  }
  if (gymstate) {
    newGym.gymstate = gymstate;
  }

  try {
    let gymId = await Gym.findById(req.params.id);
    let updatedGym = await Gym.findByIdAndUpdate(
      gymId,
      { $set: newGym },
      { new: true }
    );
    res.json(updatedGym);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating gym details" });
  }
});

// deleting gym
router.delete("/deletegym/:id", async (req, res) => {
  try {
    let gymId = await Gym.findById(req.params.id);
    if (!gymId) {
      return res.status(404).send("Gym ID not found in the request");
    }

    const gymToDelete = await Gym.findById(gymId);
    if (!gymToDelete) {
      return res.status(404).send("Gym not found");
    }

    let deletedGym = await Gym.findByIdAndDelete(gymId);
    res.json(deletedGym);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred while deleting gym account" });
  }
});

// Update password
router.put("/updategympassword", fetchgym, async (req, res) => {
  const { gympassword, newPassword } = req.body;

  try {
    const gymId = req.gym.id;
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return res.status(404).send("Gym Account not found");
    }
    const isPasswordValid = await bcrypt.compare(gympassword, gym.gympassword);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    gym.gympassword = hashedNewPassword;
    await gym.save();

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
