/**
 * Using POST params update or save a book to the database
 * If res.locals.book is there, it's an update otherwise this middleware creates an entity
 * Redirects to /book after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const BookModel = requireOption(objectrepository, 'BookModel');

    return function (req, res, next) {
        if (
            typeof req.body.title === 'undefined' ||
            typeof req.body.author === 'undefined' ||
            typeof req.body.genre === 'undefined' ||
            typeof req.body.language === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.book === 'undefined') {
            res.locals.book = new BookModel();
        }
        res.locals.book.title = req.body.title;
        res.locals.book.author = req.body.author;
        res.locals.book.genre = req.body.genre;
        res.locals.book.language = req.body.language;
        res.locals.book.isStocked = req.body.isStocked === "on" ? true : false;
        res.locals.book.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    };
};