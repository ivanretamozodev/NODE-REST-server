const { Router } = require('express');
const { check } = require('express-validator');
const {
    createCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const { CategoryByIdExist, CategoryIdExist } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const router = Router();
//get categories - public
router.get('/', getCategories);
//categories wwith id - public
router.get(
    '/:id',
    [
        check('id', 'the id is incorrect').isMongoId(),
        check('id').custom(CategoryIdExist),
        validateFields
    ],

    getCategoriesById
);
//Create categories - Only users with authorization
router.post(
    '/',
    [
        validateJWT,
        isAdminRole,
        check('name', 'the name is required').not().isEmpty(),
        validateFields
    ],
    createCategory
);
//Update categories - Only users with authorization
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'the name is required').not().isEmpty(),
        check('id', 'the id is incorrect').isMongoId(),
        check('id').custom(CategoryIdExist),
        validateFields
    ],
    updateCategory
);
//Delete categories - only admins
router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'the id is incorrect').isMongoId(),
        check('id').custom(CategoryIdExist),
        validateFields
    ],
    deleteCategory
);
module.exports = router;
