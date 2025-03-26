const express = require('express');
const router = express.Router();
const suppliersController = require('../../controllers/suppliersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), suppliersController.registerSupplier)
module.exports = router;
