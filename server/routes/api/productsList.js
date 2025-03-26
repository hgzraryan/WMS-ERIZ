const express = require('express');
const router = express.Router();
const productsListController = require('../../controllers/productsListController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), productsListController.getAllProductsList)
    .post(verifyRoles(ROLES_LIST.Admin), productsListController.getAllProductsList)
    .put(verifyRoles(ROLES_LIST.Admin), productsListController.updateProductsList)
    .delete(verifyRoles(ROLES_LIST.Admin), productsListController.deleteProductsList);
module.exports = router;

