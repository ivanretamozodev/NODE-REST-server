const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUser = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [length, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(limit).skip(skip)
    ]);
    res.json({
        length,
        user
    });
};
const postUser = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    //encrypting password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //save in DB
    await user.save();
    res.json(user);
};

const putUser = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, email, ...otherFields } = req.body;
    //validate in DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        otherFields.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, otherFields);

    res.json(user);
};

const patchUser = (req, res = response) => {
    res.json({
        message: 'patch - API'
    });
};

const deleteUser = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });
    res.json(user);
};

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};
