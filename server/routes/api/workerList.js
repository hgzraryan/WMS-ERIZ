const express = require('express');
const router = express.Router();
const workersController = require('../../controllers/workersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), workersController.getAllWorkers)
    .post(verifyRoles(ROLES_LIST.Admin), workersController.getAllWorkers)
    .put(verifyRoles(ROLES_LIST.Admin), workersController.updateWorker)
    .delete(verifyRoles(ROLES_LIST.Admin), workersController.deleteWorker);
module.exports = router;

