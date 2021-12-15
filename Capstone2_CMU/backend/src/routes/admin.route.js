const express = require('express');
const router = express.Router();

const controllerAccount = require('../controllers/admin/account.controller');
const controllerBranch = require('../controllers/admin/branch.controller');

router.get('/', controllerBranch.getBranchManager);

// chi nhanh 
router.get('/branchmanagement', controllerBranch.getBranchManager);

router.post('/branchmanagement',  controllerBranch.postBranchManager );

router.put('/branchmanagement/:id',  controllerBranch.putBranchManager );

router.delete('/branchmanagement/:id',  controllerBranch.deleteBranchManager );

// account 
router.get('/accountmanager', controllerAccount.getListManager);

router.post('/accountmanager',  controllerAccount.postManager );

router.put('/accountmanager/:id',  controllerAccount.putManager );

router.delete('/accountmanager/:id',  controllerAccount.deleteManager );

module.exports = router;