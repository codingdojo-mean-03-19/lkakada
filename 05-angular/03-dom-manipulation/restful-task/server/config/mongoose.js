const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/task_api', { useMongoClient: true });
module.exports = require('mongoose');