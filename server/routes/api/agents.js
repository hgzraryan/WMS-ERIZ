const express = require('express');
const router = express.Router();
const agentsController = require('../../controllers/agentsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), agentsController.getAgents)

module.exports = router;
