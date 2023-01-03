const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUser = (req, res = response) => {
    res.json({
        message: 'get - API'
    });
};
const postUser = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    //Check if the email exists

    //encrypting password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //save in DB
    await user.save();
    res.json({
        message: 'post - API',
        data: user
    });
};

const putUser = (req, res = response) => {
    res.json({
        message: 'put - API'
    });
};

const patchUser = (req, res = response) => {
    res.json({
        message: 'patch - API'
    });
};

const deleteUser = (req, res = response) => {
    res.json({
        message: 'delete - API'
    });
};

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};
