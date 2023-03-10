const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'the name is required']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    image: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    description: {
        type: String,
        default: `product description`
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = new model('Product', ProductSchema);
