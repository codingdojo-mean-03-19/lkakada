const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/otter_dashboard', { useNewUrlParser: true });
module.exports = require('mongoose');