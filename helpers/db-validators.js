const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`the role: "${role}" is not valid`);
    }
};

const emailIsAlreadyUsed = async (email) => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`the email: "${email}" is already used`);
    }
};

const userByIdExist = async (id) => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`the user not exist`);
    }
};

module.exports = {
    isRoleValid,
    emailIsAlreadyUsed,
    userByIdExist
};
