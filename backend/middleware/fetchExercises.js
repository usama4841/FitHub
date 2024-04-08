// middleware/fetchExercises.js

const Exercise = require('../models/exercises');

const fetchExercises = async (req, res, next) => {
    try {
        const exercises = await Exercise.find(); // Fetch all exercises
        res.json(exercises); // Send the exercises as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = fetchExercises;
