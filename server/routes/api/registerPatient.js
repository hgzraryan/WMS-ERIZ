const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/patientController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), patientController.registerPatient)

module.exports = router;