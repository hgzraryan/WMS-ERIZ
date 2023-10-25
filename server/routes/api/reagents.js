const express = require('express');
const router = express.Router();
const reagentsController = require('../../controllers/reagentsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), reagentsController.getReagentList)

module.exports = router;
