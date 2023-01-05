const { Schema, model } = require('mongoose');

const CategorieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
CategorieSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = new model('Categorie', CategorieSchema);
