const express = require('express');
const router = express.Router();
const customersController = require('../../controllers/customersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), customersController.getAllCustomers)
    .post(verifyRoles(ROLES_LIST.Admin), customersController.getAllCustomers)
    .put(verifyRoles(ROLES_LIST.Admin), customersController.updateCustomer)
    .delete(verifyRoles(ROLES_LIST.Admin), customersController.deleteCustomer);
module.exports = router;

