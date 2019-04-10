const mongoose = require('../config/mongoose.js');
const otterSchema = new mongoose.Schema({
    name: { type: String, required: "Please enter otter name", minlength: 3 },
    age: { type: Number },
    description: { type: String, required: "Please enter otter description", minlength: 3 }
}, { timestamps: true });
mongoose.model('Otter', otterSchema); //We are setting this schema in our models as 'Otter'
const Otter = mongoose.model('Otter'); //We are retrieving this schema from our model, named 'Otter'

module.exports = Otter;