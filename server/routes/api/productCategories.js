const express = require('express');
const router = express.Router();
const productCategoryController = require('../../controllers/productCategoryController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), productCategoryController.getAllCategories)
    .post(verifyRoles(ROLES_LIST.Admin), productCategoryController.getAllCategories)
    .put(verifyRoles(ROLES_LIST.Admin), productCategoryController.updateCategory)
    .delete(verifyRoles(ROLES_LIST.Admin), productCategoryController.deleteCategory);
module.exports = router;

