const express = require('express');
const router = express.Router();
const repeatIncomingController = require('../../controllers/repeatIncomingController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), repeatIncomingController.repeatIncoming)
module.exports = router;
