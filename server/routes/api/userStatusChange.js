const express = require('express');
const router = express.Router();
const usersStatusController = require('../../controllers/usersStatusController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), usersStatusController.changeUserStatus)
module.exports = router;

