const express = require('express');
const router = express.Router();
const researchController = require('../../controllers/researchController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), researchController.getAllResearch)
    .post(verifyRoles(ROLES_LIST.Admin), researchController.getResearchCategory)

module.exports = router;