const express = require('express');
const router = express.Router();
const reportExportController = require('../../controllers/reportExportController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/productsMovements')
    .post(verifyRoles(ROLES_LIST.Admin), reportExportController.productMovements);

	

	
module.exports = router;

