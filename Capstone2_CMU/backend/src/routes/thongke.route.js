const express = require('express');
const router = express.Router();

const thongkeController = require('../controllers/admin/thongke.controller')

router.get('/', thongkeController.thongke);

module.exports = router;