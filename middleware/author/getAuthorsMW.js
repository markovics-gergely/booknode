/**
 * Load all author from the database
 * The result is saved to res.locals.authors
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AuthorModel = requireOption(objectrepository, 'AuthorModel');

    return function (req, res, next) {
        AuthorModel.find({}).exec((err, authors) => {
            if (err) {
                return next(err);
            }
            res.locals.authors = authors;
            return next();
        });
    };
};