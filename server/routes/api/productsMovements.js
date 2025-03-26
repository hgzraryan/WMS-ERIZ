const express = require('express');
const router = express.Router();
const productsMovementsController = require('../../controllers/productsMovementsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), productsMovementsController.getAllProductsMovements)

module.exports = router;
