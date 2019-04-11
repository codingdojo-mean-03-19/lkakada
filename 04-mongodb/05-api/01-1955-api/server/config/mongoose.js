const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955_API', { useMongoClient: true });
module.exports = require('mongoose');