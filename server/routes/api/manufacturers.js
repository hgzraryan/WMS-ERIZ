const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const  manufacturersController  = require('../../controllers/manufacturersController');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), manufacturersController.getAllManufacturers)
    .post(verifyRoles(ROLES_LIST.Admin), manufacturersController.getAllManufacturers)
    .put(verifyRoles(ROLES_LIST.Admin), manufacturersController.updateManufacturer)
    .delete(verifyRoles(ROLES_LIST.Admin), manufacturersController.deleteManufacturer);
module.exports = router;

