const mongoose = require('mongoose');

const { Schema } = mongoose;

const electronic_bill = new Schema({
    id_user: { type: String, },
    fullName: { type: String, },
    phoneNumber: { type: String, },
    address: { type: String, },
    dateBuy: { type: String},
    payments: { type: String},
    listProduct: { type: Array, }
});

module.exports = mongoose.model('electronic_bill', electronic_bill, 'electronic_bill');