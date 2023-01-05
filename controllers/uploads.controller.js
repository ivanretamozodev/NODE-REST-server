const { response } = require('express');

const uploadFiles = async (req, res = response) => {
    res.status(200).json({
        message: 'upload complete'
    });
};

module.exports = {
    uploadFiles
};
