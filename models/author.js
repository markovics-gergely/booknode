const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Author = db.model('Author', {
    name: String,
    bornPlace: String,
    bornTime: {type: Date, max: Date.now, default: Date.now},
    alias: String,
    deathPlace: String,
    deathTime: {type: Date, max: Date.now, default: Date.now}
});

module.exports = Author;