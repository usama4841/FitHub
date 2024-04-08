const mongoose = require('mongoose');

// creating schema 
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserSchema', UserSchema);
