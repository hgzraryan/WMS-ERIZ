const express = require('express');
const router = express.Router();
const customersController = require('../../controllers/customersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), customersController.registerCustomer)
module.exports = router;
