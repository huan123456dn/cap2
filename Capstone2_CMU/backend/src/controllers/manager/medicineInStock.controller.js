// const listProduct = require('../../models/medicineInStock.model');

// // danh sach thuoc  trong kho
// const getListProduct = async (req, res) => {
//     const result = await listProduct.find();
//     if (result) {
//         res.json(result)
//     } else {
//         return res.status(400).json({  error: 'error get Thuoc trong kho' });
//     }
// }

// // create thuoc  trong kho
// const postProduct = async (req, res) => {
//     const result = await listProduct.create(req.body);
//     if (result) {
//         res.json(result)
//     } else {
//         return res.status(400).json({ error: 'error post Thuoc trong kho '});
//     }
// }

// // put thuoc  trong kho
// const putProduct = async (req, res) => {
//     const result = await listProduct.findById(req.params.id);
//     if (result) {
//         Object.assign(result, req.body);
//         await result.save();
//         res.json(result)
//     } else {
//         return res.status(400).json({ error: 'error put Thuoc trong kho' });
//     }
// }

// // delete thuoc  trong kho
// const deleteProduct = async (req, res) => {
//     const result = await listProduct.deleteOne({ _id: req.params.id });
//     if (result) {
//         res.json(result)
//     } else {
//         return res.status(400).json({ error: 'error delete Thuoc trong kho' });
//     }
// }

// module.exports = {
//     getListProduct,
//     deleteProduct,
//     postProduct,
//     putProduct
// };