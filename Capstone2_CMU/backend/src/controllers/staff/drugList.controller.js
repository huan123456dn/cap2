const listProduct = require('../../models/drugList.model');

//  danh sach thuoc
const getListProduct = async (req, res) => {
    const result = await listProduct.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get Danh sach thuoc' });
    }
}


//  danh sach thuoc hết hàng
const thuocsaphethang = async (req, res) => {
    const result = await listProduct.find().sort({quantity : 1});
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get Danh sach thuoc' });
    }
}


//  danh sach thuoc hết hạn
const thuocsaphethan = async (req, res) => {
    const result = await listProduct.find()
    .sort({expiryDate : 1});
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get Danh sach thuoc' });
    }
}

module.exports = {
    getListProduct,
    thuocsaphethang,
    thuocsaphethan
};