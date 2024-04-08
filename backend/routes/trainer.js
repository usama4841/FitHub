const express = require("express");
const Trainer = require("../models/Trainerschema");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchgym = require("../middleware/fetchgym");

//delete trainer
router.delete("/deletetrainer/:id", async (req, res) => {
  try {
    let trainerId = req.params.id;
    let trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).send("Trainer not found");
    }
    let deletedTrainer = await Trainer.findByIdAndDelete(trainerId);
    res.json(deletedTrainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error occurred while deleting trainer" });
  }
});

// update trainer
router.put("/updatetrainer/:id", async (req, res) => {
  try {
    let trainerId = req.params.id;
    let updatedTrainerData = req.body;

    let updatedTrainer = await Trainer.findByIdAndUpdate(trainerId, updatedTrainerData, { new: true });

    if (!updatedTrainer) {
      return res.status(404).send("Trainer not found");
    }
    res.json(updatedTrainer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error occurred while updating trainer" });
  }
});


















// Route to add a new trainer
//Creating gym
router.post(
    "/addtrainer",
    fetchgym,
    //applying validation on the data
 
    async (req, res) => {
      try {
        const { trainername,trainernumber,traineraddress,traineremail,clients} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const trainer = new Trainer({
            trainername,
            trainernumber,
            traineraddress,
            traineremail,
            clients,
          gym: req.gym.id,
        });
        const savedtrainer = await trainer.save();
        res.json(savedtrainer);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "error occcurred" });
      }
    }
  );



//fetching trainer specific gym
//fetching trainer specific gym
router.get("/fetchtrainers", fetchgym, async (req, res) => {
    try {
        // Assuming Trainer model has the correct schema defined
        const trainers = await Trainer.find({ gym: req.gym.id });
       
        res.json(trainers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error occurred while fetching trainers" });
    }
});

module.exports = router;