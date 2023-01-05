const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles } = require('../controllers/uploads.controller');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/', uploadFiles);

module.exports = router;
