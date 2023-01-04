const { response, request } = require('express');

const isAdminRole = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'talk with admin'
        });
    }

    const { name, role } = req.user;

    if (role !== 'ADMIN_ROLE') {
        res.status(401).json({
            message: `${name}, is not admin`
        });
    }

    next();
};

const haveRole = (...roles) => {
    return (req, res, next) => {
        console.log(roles, req.user.role);
        next();
    };
};

module.exports = {
    isAdminRole,
    haveRole
};
