const express = require('express');
const router = express.Router();
const productCategoryController = require('../../controllers/productCategoryController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), productCategoryController.registerCategory)
module.exports = router;
