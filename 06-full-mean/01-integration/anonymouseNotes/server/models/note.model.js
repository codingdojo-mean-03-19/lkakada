const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchme = Schema({
    note: {
        type: String,
        trim: true,
        required: [true, "Note field is required."],
        minlength: [4, "Note must be at least 4 characters"]
    }
}, { timestamps: true });
module.exports = mongoose.model('Note', NoteSchme);