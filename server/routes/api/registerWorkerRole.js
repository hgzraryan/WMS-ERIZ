const express = require('express');
const router = express.Router();
const workerRolesController = require('../../controllers/workerRolesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
	.post(verifyRoles(ROLES_LIST.Admin), workerRolesController.registerWorkerRole)
module.exports = router;
