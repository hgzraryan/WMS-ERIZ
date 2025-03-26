const express = require('express');
const router = express.Router();
const incomingProductsController = require('../../controllers/incomingProductsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), incomingProductsController.getAllProducts)
    .post(verifyRoles(ROLES_LIST.Admin), incomingProductsController.getAllProducts)
    .put(verifyRoles(ROLES_LIST.Admin), incomingProductsController.updateProduct)
    .delete(verifyRoles(ROLES_LIST.Admin), incomingProductsController.deleteProduct);
module.exports = router;

