const mongoose = require('mongoose');
//Connect mongoose to mongoDB
mongoose.connect('mongodb://localhost/quote_mongoose', { useNewUrlParser: true });
module.exports = require('mongoose');