const { ObjectId } = require('mongoose').Types;
const { trusted } = require('mongoose');
const { Product, User, Categorie } = require('../models');
const user = require('../models/user');

const validCollections = ['products', 'users', 'categories'];

const searchCategories = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const category = await Categorie.findById(query);
        return res.status(200).json({
            results: category ? category : []
        });
    }

    const regex = new RegExp(query, 'i');

    const categories = await Categorie.find({ name: regex, status: true });

    res.status(200).json({
        results: categories
    });
};

const searchUser = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const user = await User.findById(query);
        return res.status(200).json({
            results: user ? user : []
        });
    }
    const regex = new RegExp(query, 'i');
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.status(200).json({
        results: users
    });
};

const searchProducts = async (query, res) => {
    const isMongoId = ObjectId.isValid(query);
    if (isMongoId) {
        const product = await Product.findById(query).populate('category', 'name');
        return res.status(200).json({
            results: product ? product : []
        });
    }

    const regex = new RegExp(query, 'i');

    const products = await Product.find({ name: regex, status: true }).populate('category', 'name');

    res.status(200).json({
        results: products
    });
};

const searchRoute = (req, res) => {
    const { colection, query } = req.params;

    if (!validCollections.includes(colection)) {
        return res.status(400).json({
            message: `the collection is incorrect`
        });
    }

    switch (colection) {
        case 'users':
            searchUser(query, res);
            break;
        case 'categories':
            searchCategories(query, res);
            break;
        case 'products':
            searchProducts(query, res);
            break;
        default:
            res.status(500).json({
                message: 'error in the server,talk with admin'
            });
            break;
    }
};

module.exports = {
    searchRoute
};
