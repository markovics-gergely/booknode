/**
 * Load all book from the database
 * The result is saved to res.locals.books
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const BookModel = requireOption(objectrepository, 'BookModel');

    return function (req, res, next) {
        BookModel.find({ author: res.locals.author._id }, (err, books) => {
            if (err) {
                return next(err);
            }
            res.locals.books = books;
            return next();
        });
    };
};