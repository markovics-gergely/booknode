/**
 * Using POST params update or save an author to the database
 * If res.locals.author is there, it's an update otherwise this middleware creates an entity
 * Redirects to /author after success
 */
 const requireOption = require('../requireOption');

 module.exports = function (objectrepository) {
     const AuthorModel = requireOption(objectrepository, 'AuthorModel');
 
     return function (req, res, next) {
         if (
             typeof req.body.name === 'undefined' ||
             typeof req.body.bornPlace === 'undefined' ||
             typeof req.body.bornTime === 'undefined' ||
             typeof req.body.alias === 'undefined' ||
             typeof req.body.deathPlace === 'undefined' ||
             typeof req.body.deathTime === 'undefined'
         ) {
             return next();
         }
 
         if (typeof res.locals.author === 'undefined') {
             res.locals.author = new AuthorModel();
         }
 
         res.locals.author.name = req.body.name;
         res.locals.author.bornPlace = req.body.bornPlace;
         res.locals.author.bornTime = req.body.bornTime;
         res.locals.author.alias = req.body.alias;
         res.locals.author.deathPlace = req.body.deathPlace;
         res.locals.author.deathTime = req.body.deathTime;
         res.locals.author.save(err => {
             if (err) {
                 return next(err);
             }
             return res.redirect('/author');
         });
     };
 };