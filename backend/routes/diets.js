const express = require('express');
const router = express.Router();
const Diet = require("../models/dietpansschema");
const fetchDietsMiddleware = require('../middleware/fetchdiets');

// Route to fetch data using the middleware
router.get('/fetchDiets', fetchDietsMiddleware);

  
  //fetch all user
  router.get("/fetchDiets", async (req, res) => {
    try {
      const diets = await Diet.find();
      res.json(diets);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Error occurred while fetching diets" });
    }
  });
  

module.exports = router;
