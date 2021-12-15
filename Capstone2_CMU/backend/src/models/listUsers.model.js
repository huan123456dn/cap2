const mongoose = require('mongoose');

const { Schema } = mongoose;

const user_list = new Schema({
    userName: { type: String, },
    fullName: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    password: { type: String},
    role: { type: String}
});

module.exports = mongoose.model('user_list', user_list, 'user_list');