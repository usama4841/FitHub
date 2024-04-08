const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Ensure Schema is imported

// Creating schema
const exercises = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    muscle:{
        type: String,
        required: true
    },
    equipment:{
        type: String,
        required: true
    },
    dificulty:{
        type: String,
        required: true
    },
    instructions:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('exercises', exercises);