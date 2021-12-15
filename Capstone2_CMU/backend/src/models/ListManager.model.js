const mongoose = require('mongoose');

const { Schema } = mongoose;

const manager_list = new Schema({
    userName: { type: String, },
    fullName: { type: String, },
    dateOfBirth: { type: String, },
    dateStart: { type: String},
    email: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    password:  { type: String, },
    role: { type: String}
});

module.exports = mongoose.model('manager_list', manager_list , 'manager_list');
