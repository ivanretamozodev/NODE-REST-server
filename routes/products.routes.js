const { Router } = require('express');
const { check } = require('express-validator');

const {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');
const { CategoryIdExist, productIdExist } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const router = Router();
router.get('/', getProducts);
router.get(
    '/:id',
    [check('id', 'the id is incorrect').isMongoId(), validateFields],
    getProductsById
);
router.post(
    '/',
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('category', 'category is required').isMongoId(),
        check('category').custom(CategoryIdExist),
        validateFields
    ],
    createProduct
);
router.put(
    '/:id',
    [validateJWT, check('id').custom(productIdExist), validateFields],
    updateProduct
);
router.delete(
    '/:id',
    [validateJWT, isAdminRole, check('id', 'the id is incorrect').isMongoId(), validateFields],
    deleteProduct
);

module.exports = router;
