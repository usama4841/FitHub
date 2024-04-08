const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/fithub';

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
    }
    }
module.exports = connectToMongo;