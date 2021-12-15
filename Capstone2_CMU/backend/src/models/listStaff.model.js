const mongoose = require('mongoose');

const { Schema } = mongoose;

const list_of_employee = new Schema({
    userName: { type: String, },
    fullName: { type: String, },
    dateOfBirth: { type: String, },
    dateStart: { type: String, },
    email: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    role: { type: String}
});

module.exports = mongoose.model('list_of_employee', list_of_employee ,'list_of_employee');
