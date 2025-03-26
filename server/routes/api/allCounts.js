const express = require('express');
const router = express.Router();
const allCountsController = require('../../controllers/allCountsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), allCountsController.getAllCount)

module.exports = router;