const express = require('express');
const router = express.Router();

const controllerAccount = require('../controllers/manager/account.controller');
const controllerOffBillList = require('../controllers/manager/billListOff.controller');
const controllerOnlineBillList = require('../controllers/manager/billListOnline.controller');
const controllerDrugList = require('../controllers/manager/drugList.controller');
// const controllerMedicineInStock = require('../controllers/manager/medicineInStock.controller');

router.get('/', controllerOffBillList.getBillList);

//  list account staff
router.get('/employeemanager', controllerAccount.getListStaff);

router.post('/employeemanager',  controllerAccount.postStaff );

router.put('/employeemanager/:id',  controllerAccount.putStaff );

router.delete('/employeemanager/:id',  controllerAccount.deleteStaff );

//off list bill 
router.get('/offbilllist', controllerOffBillList.getBillList);

router.get('/offbilllist/:id',  controllerOffBillList.getBillListID );

router.post('/offbilllist', controllerOffBillList.postBill);

router.put('/offbilllist/:id',  controllerOffBillList.putBill );

router.delete('/offbilllist/:id',  controllerOffBillList.deleteBill );

// off list bill Product 
router.put('/offbilllistproduct', controllerOffBillList.putProduct); 

// xóa
router.put('/offbilllistproduct/:id', controllerOffBillList.deleteProduct);

// online list bill 
router.get('/onlinebilllist', controllerOnlineBillList.getBillList);

router.get('/onlinebilllist/:id',  controllerOnlineBillList.getBillListID );

router.post('/onlinebilllist',  controllerOnlineBillList.postBill );

router.put('/onlinebilllist/:id',  controllerOnlineBillList.putBill );

router.delete('/onlinebilllist/:id',  controllerOnlineBillList.deleteBill );


//online list bill Product put
router.put('/onlinebilllistproduct/', controllerOnlineBillList.putProduct);

// delte product
router.put('/onlinebilllistproduct/:id', controllerOnlineBillList.deleteProduct);

//  danh sach thuoc
router.get('/druglist', controllerDrugList.getListProduct);

router.post('/druglist',  controllerDrugList.postProduct );

router.put('/druglist/:id',  controllerDrugList.putProduct );

router.delete('/druglist/:id',  controllerDrugList.deleteProduct );

// thuoc trong kho
// router.get('/medicineinstock', controllerMedicineInStock.getListProduct);

// router.post('/medicineinstock',  controllerMedicineInStock.postProduct );

// router.put('/medicineinstock/:id',  controllerMedicineInStock.putProduct );

// router.delete('/medicineinstock/:id',  controllerMedicineInStock.deleteProduct );

module.exports = router;