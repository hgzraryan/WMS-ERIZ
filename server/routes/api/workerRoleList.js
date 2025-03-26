const express = require('express');
const router = express.Router();
const workerRolesController = require('../../controllers/workerRolesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), workerRolesController.getAllWorkerRoles)
    .post(verifyRoles(ROLES_LIST.Admin), workerRolesController.getAllWorkerRoles)
    .put(verifyRoles(ROLES_LIST.Admin), workerRolesController.updateWorkerRole)
    .delete(verifyRoles(ROLES_LIST.Admin), workerRolesController.deleteWorkerRole);
module.exports = router;

