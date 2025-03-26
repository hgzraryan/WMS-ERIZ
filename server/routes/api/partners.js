const express = require('express');
const router = express.Router();
const partnersController = require('../../controllers/partnersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), partnersController.getAllPartners)
    .post(verifyRoles(ROLES_LIST.Admin), partnersController.getAllPartners)
    .put(verifyRoles(ROLES_LIST.Admin), partnersController.updatePartner)
    .delete(verifyRoles(ROLES_LIST.Admin), partnersController.deletePartner);

    router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), partnersController.getPartner);
module.exports = router;

