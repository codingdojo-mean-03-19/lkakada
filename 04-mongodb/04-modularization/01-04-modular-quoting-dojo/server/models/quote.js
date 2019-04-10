const mongoose = require('../config/mongoose.js');

const QuoteSchema = new mongoose.Schema({
    name: { type: String },
    message: { type: String }
}, { timestamps: true });
mongoose.model('Quote', QuoteSchema); //We are setting this schema in our models as 'Quote'
const Quote = mongoose.model('Quote'); //We are retrieving this schema from our model, named 'Quote'

module.exports = Quote;