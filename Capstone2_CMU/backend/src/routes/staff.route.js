const express = require('express');
const router = express.Router();

const controllerOffBillList = require('../controllers/staff/billListOff.controller');
const controllerOnlineBillList = require('../controllers/staff/billListOnline.controller');
const controllerDrugList = require('../controllers/staff/drugList.controller');

// list bill product
router.get('/offbilllist', controllerOffBillList.getBillList);

// // list bill billlistonline
router.get('/onlinebilllist', controllerOnlineBillList.getBillList);

//  danh sach thuoc
router.get('/druglist', controllerDrugList.getListProduct);

//  danh sach thuoc hết hàng
router.get('/druglistquantity', controllerDrugList.thuocsaphethang);

//  danh sach thuoc hết hạn
router.get('/druglistdate', controllerDrugList.thuocsaphethan);

module.exports = router;