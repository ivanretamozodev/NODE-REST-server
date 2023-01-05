const { response } = require('express');
const { Product } = require('../models');

const getProducts = async (req, res = response) => {
    const { limit, skip } = req.params;
    const query = { status: true };

    const [length, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .limit(limit)
            .skip(skip)
    ]);

    res.status(200).json({
        length,
        product
    });
};
const getProductsById = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name');
    res.status(200).json(product);
};
const createProduct = async (req, res = response) => {
    const { user, status, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            message: `the product: ${productDB.name} already exists`
        });
    }
    const data = {
        ...body,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    };

    const product = await new Product(data);

    await product.save();

    res.status(200).json({
        product
    });
};
const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { user, status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json(product);
};
const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
    res.status(200).json(product);
};

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};
