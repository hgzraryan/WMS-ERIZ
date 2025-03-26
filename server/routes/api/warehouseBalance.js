const express = require('express');
const router = express.Router();
const warehouseBalanceController = require('../../controllers/warehouseBalanceController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), warehouseBalanceController.getAllProductsSummary)
module.exports = router;