const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name field is required. "],
        minlength: [2, "Name must be at least 3 letters."]
    }
}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema);