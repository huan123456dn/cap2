const mongoose = require('mongoose');

async function connect  () {
    try {
        await mongoose.connect('mongodb://localhost:27017/PharmacyManager' );
        console.log("connect mongodb");
    } catch (error) {
        console.log("connect fail");
    }
}

module.exports ={connect};