const express = require('express');
const router = express.Router();
const organizationsController = require('../../controllers/organizationsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), organizationsController.getOrganizations)

module.exports = router;
