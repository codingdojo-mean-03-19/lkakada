const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters']
    },
    position: {
        type: String,
        trim: true,
        required: false
    },
    game1: {
        type: String,
        default: 'undecided'
    },
    game2: {
        type: String,
        default: 'undecided'
    },
    game3: {
        type: String,
        default: 'undecided'
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);