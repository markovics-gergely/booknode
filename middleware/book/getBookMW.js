/**
 * Load a book from the database using the :bookid param
 * The result is saved to res.locals.book
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const BookModel = requireOption(objectrepository, 'BookModel');

    return function (req, res, next) {
        BookModel.findOne({ _id: req.params.bookid }).populate('author').exec((err, book) => {
            if (err) {
                return next(err);
            }
            res.locals.book = book;
            return next();
        });
    };
};