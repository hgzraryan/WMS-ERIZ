const express = require('express');
const router = express.Router();
const manufacturersController = require('../../controllers/manufacturersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), manufacturersController.registerManufacturer)
module.exports = router;
