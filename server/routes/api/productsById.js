const express = require('express');
const router = express.Router();
const incomingProductsController = require('../../controllers/incomingProductsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), incomingProductsController.getIncomingProductsById)
module.exports = router;