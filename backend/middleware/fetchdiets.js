const Diet = require('../models/dietpansschema');

const fetchDiets = async (req, res, next) => {
    try {
        const diets = await Diet.find(); // Fetch all exercises
        res.json(diets); // Send the exercises as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = fetchDiets;
