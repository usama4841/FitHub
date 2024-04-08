const mongoose = require('mongoose');

// creating schema 
const ConnectReqSchema = new mongoose.Schema({
    cname:{
        type: String,
        required: true
    },
    cemailaddress:{
        type: String,
        required: true
    },
  
    ccontact:{
        type: Number,
        required: true
    },
    cdesc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ConnectReqSchema', ConnectReqSchema);