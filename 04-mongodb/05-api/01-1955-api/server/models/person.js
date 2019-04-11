const mongoose = require('../config/mongoose.js');

const peopleSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
mongoose.model('People', peopleSchema); //We are setting this schema in our models as 'Otter'
const People = mongoose.model('People'); //We are retrieving this schema from our model, named 'Otter'

module.exports = People;
