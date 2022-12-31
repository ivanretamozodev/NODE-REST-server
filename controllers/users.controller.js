const { response } = require('express');

const getUser = (req, res = response) => {
    res.json({
        message: 'get - API'
    });
};
const postUser = (req, res = response) => {
    res.json({
        message: 'post - API'
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
