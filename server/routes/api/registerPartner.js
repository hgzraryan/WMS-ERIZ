const express = require('express');
const router = express.Router();
const partnersController = require('../../controllers/partnersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), partnersController.registerPartner)
module.exports = router;
