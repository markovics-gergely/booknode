const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ME7KKE', { useNewUrlParser: true });

module.exports = mongoose;