const express = require('express');
const router = express.Router();
const legalFormsController = require('../../controllers/legalFormsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), legalFormsController.getAllLegalForms)
    .post(verifyRoles(ROLES_LIST.Admin), legalFormsController.getAllLegalForms)
    .put(verifyRoles(ROLES_LIST.Admin), legalFormsController.updateLegalForm)
    .delete(verifyRoles(ROLES_LIST.Admin), legalFormsController.deleteLegalForm);
module.exports = router;

