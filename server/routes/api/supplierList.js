const express = require('express');
const router = express.Router();
const suppliersController = require('../../controllers/suppliersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), suppliersController.getAllSuppliers)
    .post(verifyRoles(ROLES_LIST.Admin), suppliersController.getAllSuppliers)
    .put(verifyRoles(ROLES_LIST.Admin), suppliersController.updateSupplier)
    .delete(verifyRoles(ROLES_LIST.Admin), suppliersController.deleteSupplier);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), suppliersController.getSupplier);
module.exports = router;

