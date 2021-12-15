const mongoose = require('mongoose');

const { Schema } = mongoose;

const user_bill = new Schema({
    id_user: { type: String, },
    listProduct: { type: Array, }
});

module.exports = mongoose.model('user_bill', user_bill, 'user_bill');