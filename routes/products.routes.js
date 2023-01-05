const { Router } = require('express');

const {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

const router = Router();
router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
