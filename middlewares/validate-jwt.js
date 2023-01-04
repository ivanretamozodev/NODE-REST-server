const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'there is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                message: 'user not exist in DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                message: 'invalid id - or user not exist'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'invalid token'
        });
    }
};

module.exports = {
    validateJWT
};
