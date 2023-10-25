const express = require('express');
const router = express.Router();
const equipmentController = require('../../controllers/equipmentController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), equipmentController.getEquipmentList)

module.exports = router;