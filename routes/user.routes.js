const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/users.controller');

const { isRoleValid, emailIsAlreadyUsed, userByIdExist } = require('../helpers/db-validators');

router.get('/', getUser);
router.post(
    '/',
    [
        check('email', 'email,not valid!').isEmail(),
        check('email', 'email is already used').custom(emailIsAlreadyUsed),
        check('name', 'the name is required').not().isEmpty(),
        check('password', 'password must have at least 6 letters').isLength({ min: 6 }),
        check('role', 'the role is required').custom(isRoleValid),
        validateFields
    ],
    postUser
);
router.put(
    '/:id',
    [
        check('id', 'the id is invalid').isMongoId(),
        check('id').custom(userByIdExist),
        check('role', 'the role is required').custom(isRoleValid),
        validateFields
    ],
    putUser
);
router.patch('/', patchUser);
router.delete(
    '/:id',
    [
        validateJWT,
        check('id', 'the id is invalid').isMongoId(),
        check('id').custom(userByIdExist),
        validateFields
    ],
    deleteUser
);

module.exports = router;
