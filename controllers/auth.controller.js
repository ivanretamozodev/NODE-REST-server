const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        //if email not exists
        if (!user) {
            res.status(400).json({
                message: 'the email or the password are not correct'
            });
        }
        //if user is active
        if (!user.status) {
            res.status(400).json({
                message: 'the email or the password are not correct'
            });
        }

        //if password is correct
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'password are not correct'
            });
        }

        //generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'talk with admin'
        });
    }
};

module.exports = {
    login
};
