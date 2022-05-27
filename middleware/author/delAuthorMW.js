/**
 * Removes an author from the database, the entity used here is: res.locals.author
 * Redirects to /author after delete
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.author === 'undefined') {
            return next();
        }

        res.locals.books.forEach(element => {
            element.remove();
        });

        res.locals.author.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/author');
        });
    };
};