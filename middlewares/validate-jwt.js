const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'there is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

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
