const validateFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        res.status(400).json({ message: 'No files were uploaded.' });
        return;
    }
    next();
};

module.exports = {
    validateFile
};
