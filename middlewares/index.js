const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');
const validateFiles = require('./validate-files');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole,
    ...validateFiles
};
