const mongoose = require('mongoose');

// creating schema 
const GymSchema = new mongoose.Schema({
    gymname:{
        type: String,
        required: true
    },
    gymemail:{
        type: String,
        required: true,
        unique: true
    },
    ownername:{
        type: String,
        required: true
    },
    gymphone:{
        type: Number,
        required: true
    },
    gympassword:{
        type: String,
        required: true,
        unique: true
    },
    gymaddress:{
        type: String,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    },
    gymcity:{
        type: String,
        required: true
    },
    gymstate:{
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('GymSchema', GymSchema);