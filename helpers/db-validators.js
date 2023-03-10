const { Categorie, Role, User, Product } = require('../models');

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

const CategoryIdExist = async (id) => {
    const categoryExist = await Categorie.findById(id);
    if (!categoryExist) {
        throw new Error(`the category does not exist`);
    }
};
const productIdExist = async (id) => {
    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`the category does not exist`);
    }
};

const validColections = (colection = '', colections = []) => {
    const included = colections.includes(colection);
    if (!included) {
        throw new Error('collection not included');
    }
    return true;
};

module.exports = {
    isRoleValid,
    emailIsAlreadyUsed,
    userByIdExist,
    CategoryIdExist,
    productIdExist,
    validColections
};
