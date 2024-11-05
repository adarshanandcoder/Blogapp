const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URI

const connection = async() => {
    const connectDB = await mongoose.connect(MONGO_URL)
    if(connectDB) console.log("Database Connection is successful");
    else console.log("Database Connection is not successful");
}

module.exports = {connection}