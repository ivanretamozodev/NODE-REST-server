const { Router } = require('express');
const { searchRoute } = require('../controllers/search.controller');

const router = Router();

router.get('/:colection/:query', searchRoute);

module.exports = router;
