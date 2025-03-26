const express = require('express');
const router = express.Router();
const productsListController = require('../../controllers/productsListController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), productsListController.registerProductsList)
module.exports = router;
