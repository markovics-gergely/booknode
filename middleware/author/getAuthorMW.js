/**
 * Load an author from the database using the :authorid param
 * The result is saved to res.locals.author
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AuthorModel = requireOption(objectrepository, 'AuthorModel');

    return function (req, res, next) {
        AuthorModel.findOne({ _id: req.params.authorid }, (err, author) => {
            if (err) {
                return next(err);
            }
            res.locals.author = author;
            return next();
        });
    };
};