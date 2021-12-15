const mongoose = require('mongoose');

const { Schema } = mongoose;

const drug_list = new Schema({
  productName: { type: String, },
  drugCode: { type: String, },
  status: { type: Number, },
  quantity: { type: Number, },
  dvt: { type: String, },
  importPrices: { type: Number, },
  price: { type: Number, },
  expiryDate: { type: String, },
  pack: { type: String, },
  img: { type: String, },
  rating: { type: Number, },
  producer: { type: String, },
  uses: { type: String, },
  support: { type: String, },
  countrySX: { type: String, },
  homeSX: { type: String, },
  element: { type: String, },
  content: { type: String, },
});

module.exports = mongoose.model('drug_list', drug_list , 'drug_list');
