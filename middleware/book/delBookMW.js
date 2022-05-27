/**
 * Removes a book from the database, the entity used here is: res.locals.book
 * Redirects to /book after delete
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.book === 'undefined') {
            return next();
        }

        res.locals.book.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    };
};