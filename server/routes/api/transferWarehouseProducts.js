const express = require('express');
const router = express.Router();
const transferWarehouseProductsController = require('../../controllers/transferWarehouseProductsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.SuperAdmin,ROLES_LIST.Admin), transferWarehouseProductsController.transfer);
	

module.exports = router;
