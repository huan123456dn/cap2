const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const controllerHome = require('../controllers/user/user.controller');
const controllerBill = require('../controllers/user/bill.controller');

router.get('/', controllerHome.getProduct);

router.get('/bill_list/:id',controllerBill.getProduct);

router.post('/bill_list/',controllerBill.postProduct);

router.put('/bill_list/',controllerBill.putProduct);

module.exports = router;