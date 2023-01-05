const { response } = require('express');

const getProducts = (req, res = response) => {};
const getProductsById = (req, res = response) => {};
const createProduct = (req, res = response) => {};
const updateProduct = (req, res = response) => {};
const deleteProduct = (req, res = response) => {};

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};
