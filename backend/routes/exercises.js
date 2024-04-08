// routes/exercises.js

const express = require('express');
const router = express.Router();
const Exercise = require("../models/exercises");
const fetchExercisesMiddleware = require('../middleware/fetchExercises');

// Route to fetch data using the middleware
router.get('/fetchexercises', fetchExercisesMiddleware);

  
  //fetch all user
  router.get("/fetchexercises", async (req, res) => {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Error occurred while fetching users" });
    }
  });
  

module.exports = router;
