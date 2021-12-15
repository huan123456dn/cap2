const mongoose = require('mongoose');

const { Schema } = mongoose;

const branch_management = new Schema({
    pharmacyName: { type: String, },
    phoneNumber: { type: String, },
    managerName: { type: String, },
    address: { type: String },
    action: { type: String, }
});

module.exports = mongoose.model('branch_management', branch_management , 'branch_management');
