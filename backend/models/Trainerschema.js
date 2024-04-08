const mongoose = require('mongoose');

// creating schema 
const Trainerschema = new mongoose.Schema({

    gym:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GymSchema'
    },


    trainername:{
        type: String,
        required: true
    },
    trainernumber:{
        type: Number,
        required: true
    },
  
    traineraddress:{
        type: String,
        required: true
    },
    traineremail: {
        type: String,
        required: true
    },
    clients:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Trainerschema', Trainerschema);