const listProduct = require('../../models/drugList.model');

// danh sach thuoc
const getListProduct = async (req, res) => {
    const result = await listProduct.find();
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({  error: 'error get Danh sach thuoc' });
    }
}

// create thuoc
const postProduct = async (req, res) => {
    const result = await listProduct.create(req.body);
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error post Danh sach thuoc '});
    }
}

// put thuoc
const putProduct = async (req, res) => {
    const result = await listProduct.findById(req.params.id);
    if (result) {
        Object.assign(result, req.body);
        await result.save();
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error put Danh sach thuoc' });
    }
}

// delete  thuoc
const deleteProduct = async (req, res) => {
    const result = await listProduct.deleteOne({ _id: req.params.id });
    if (result) {
        res.json(result)
    } else {
        return res.status(400).json({ error: 'error delete Danh sach thuoc' });
    }
}

module.exports = {
    getListProduct,
    deleteProduct,
    postProduct,
    putProduct
};