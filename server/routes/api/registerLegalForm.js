const express = require('express');
const router = express.Router();
const legalFormsController = require('../../controllers/legalFormsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), legalFormsController.registerLegalForm)
module.exports = router;
