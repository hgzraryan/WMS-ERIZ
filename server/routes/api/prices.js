const express = require('express');
const router = express.Router();
const pricesController = require('../../controllers/pricesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), pricesController.getPriceList)

module.exports = router;
