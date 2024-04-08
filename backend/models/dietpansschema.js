const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Ensure Schema is imported

// Creating schema
const dietpansschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    directions:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('dietpansschema', dietpansschema);