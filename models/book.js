const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Book = db.model('Book', {
    title: String,
    genre: String,
    language: String,
    isStocked: { type: Boolean, default: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author' }
});

module.exports = Book;