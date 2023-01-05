const { response } = require('express');
const { Categorie } = require('../models');
const user = require('../models/user');

const getCategories = async (req, res = response) => {
    const { limit, skip } = req.params;
    const query = { status: true };

    const [length, category] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query).populate('user', 'name').limit(limit).skip(skip)
    ]);

    res.status(200).json({
        length,
        category
    });
};

const getCategoriesById = async (req, res = response) => {
    const { id } = req.params;
    const category = await Categorie.findById(id);
    res.status(200).json(category);
};

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Categorie.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            message: `the category: ${categoryDB.name} already exists`
        });
    }

    const data = {
        name,
        user: req.user._id
    };

    const category = await new Categorie(data);

    //Save in DB
    await category.save();

    res.status(201).json({
        category
    });
};

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { user, status, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = new Categorie.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Categorie.findByIdAndUpdate(id, { status: false });
    res.status(200).json({
        message: category
    });
};

module.exports = {
    getCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    deleteCategory
};
