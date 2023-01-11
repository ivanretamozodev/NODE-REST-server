const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { loadFile } = require('../helpers');
const { User, Product } = require('../models');

const uploadFiles = async (req, res = response) => {
    try {
        //images
        const Path = await loadFile(req.files, undefined, 'images');
        res.status(200).json({
            Path
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updateImage = async (req, res = response) => {
    const { colection, id } = req.params;

    let model;
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'the user id not exists'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'the product id not exists'
                });
            }
            break;
        default:
            res.status(500).json({
                message: 'talk with admin'
            });
    }
    //clean image in server
    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', colection, model.image);
        //if exist,image is deleted
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }
    const name = await loadFile(req.files, undefined, colection);

    model.image = name;

    await model.save();

    res.status(200).json(model);
};

const showImages = async (req, res = response) => {
    const { colection, id } = req.params;

    let model;
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'the user id not exists'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: 'the product id not exists'
                });
            }
            break;
        default:
            res.status(500).json({
                message: 'talk with admin'
            });
    }
    //clean image in server
    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', colection, model.image);
        //if exist,image is deleted
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const notFoundImage = path.join(__dirname, '../assets/not_found_image.jpg');

    res.sendFile(notFoundImage);
};

module.exports = {
    uploadFiles,
    updateImage,
    showImages
};
