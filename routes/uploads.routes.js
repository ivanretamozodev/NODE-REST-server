const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateImage } = require('../controllers/uploads.controller');
const { validColections } = require('../helpers');
const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.post('/', [validateFile], uploadFiles);

router.put(
    '/:colection/:id',
    [
        validateFile,
        check('id', 'the id is not correct').isMongoId(),
        check('colection').custom((c) => validColections(c, ['users', 'products'])),
        validateFields
    ],
    updateImage
);

module.exports = router;
