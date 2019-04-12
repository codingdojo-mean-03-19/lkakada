const mongoose = require('../config/mongoose.js');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Task title is required'],
        minlength: [5, 'Task title length must be greater than 5'],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });
mongoose.model('Task', taskSchema);
const Task = mongoose.model('Task');
module.exports = Task;