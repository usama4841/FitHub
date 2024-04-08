// Package.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new mongoose.Schema({
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym' // Assuming you have a Gym schema defined
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PackageSchema', PackageSchema);
