const { Router } = require('express');
const router = Router();

const {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/users.controller');

router.get('/', getUser);
router.post('/', postUser);
router.put('/', putUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);

module.exports = router;
