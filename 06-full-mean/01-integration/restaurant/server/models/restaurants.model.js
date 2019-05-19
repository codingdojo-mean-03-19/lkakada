const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required.'],
        minlength: [3, 'Name must be at least three characters long. ']
    },
    star: {
        type: Number,
        default: 1,
        min: [1, 'Evaluation must be between 1 to 5 stars'],
        max: [5, 'Evaluation must be between 1 to 5 stars']
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'Review is required.'],
        minlength: [5, 'Review must be at least five characters long']
    }
}, { timestamps: true })

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Restaurant name is required.'],
        minlength: [3, 'Restaurant name must be at least three characters long. ']
    },
    cuisine: {
        type: String,
        trim: true,
        required: [true, 'Restaurant cuisin is required.'],
        minlength: [3, 'Restaurant cuisine must be at least three characters long.']
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]

}, { timestamps: true });


module.exports = mongoose.model('Restaurant', RestaurantSchema);
module.exports = mongoose.model('Review', ReviewSchema);
