const mongoose = require('mongoose');

const { Schema } = mongoose;

const bill_at_the_counter = new Schema({
    fullName: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    dateBuy: { type: String},
    staff : { type: String},
    listProduct: { type: Array, }
});

module.exports = mongoose.model('bill_at_the_counter', bill_at_the_counter, 'bill_at_the_counter');