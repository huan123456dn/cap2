const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountUser = new Schema({
    userName: { type: String, },
    fullName: { type: String, },
    email: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    password: { type: String, },
    role: { type: String},
});

module.exports = mongoose.model('AccountUser', AccountUser ,'AccountUser');