const mongoose = require('mongoose');

// creating schema 
const AdminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    CreatedaAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('AdminSchema', AdminSchema);