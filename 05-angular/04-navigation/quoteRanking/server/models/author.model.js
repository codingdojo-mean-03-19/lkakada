const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name field is required. "],
        minlength: [3, "Name must be at least 3 letters."]
    },
    quotes: [
        {
            content: {
                type: String,
                trim: true,
                required: [true, "A quote field is required."],
                minlength: [3, "A quote must contain at least three characters."]
            },
            votes: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Author', AuthorSchema);