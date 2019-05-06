const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title field is required. '],
        minlength: [4, 'Title must be at least 4 letters.']
    },
    price: {
        type: Number,
        required: [true, "Price field is required."]
    },
    imageUrl: {
        type: String,
        trim: true,
        required: false
    }
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
