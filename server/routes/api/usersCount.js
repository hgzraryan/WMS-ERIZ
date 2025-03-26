const express = require('express');
const router = express.Router();
const userCountsController = require('../../controllers/userCountsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), userCountsController.getUserCounts)

module.exports = router;
