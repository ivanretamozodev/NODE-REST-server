const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'the role is required']
    }
});

module.exports = new model('Role', roleSchema);
