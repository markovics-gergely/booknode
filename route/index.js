const renderMW = require('../middleware/renderMW');

const getAuthorMW = require('../middleware/author/getAuthorMW');
const getAuthorsMW = require('../middleware/author/getAuthorsMW');
const delAuthorMW = require('../middleware/author/delAuthorMW');
const saveAuthorMW = require('../middleware/author/saveAuthorMW');

const getBookMW = require('../middleware/book/getBookMW');
const getBooksMW = require('../middleware/book/getBooksMW');
const getBooksByAuthorMW = require('../middleware/book/getBooksByAuthorMW');
const delBookMW = require('../middleware/book/delBookMW');
const saveBookMW = require('../middleware/book/saveBookMW');

const BookModel = require('../models/book');
const AuthorModel = require('../models/author');

module.exports = function (app) {
    const objRepo = {
        BookModel: BookModel,
        AuthorModel: AuthorModel
    };

    app.get('/book/details/:bookid',
        getBookMW(objRepo),
        renderMW(objRepo, 'book/book-details'));
    app.use('/book/save',
        getAuthorsMW(objRepo),
        saveBookMW(objRepo),
        renderMW(objRepo, 'book/book-edit'));
    app.use('/book/edit/:bookid',
        getAuthorsMW(objRepo),
        getBookMW(objRepo),
        saveBookMW(objRepo),
        renderMW(objRepo, 'book/book-edit'));
    app.get('/book/del/:bookid',
        getBookMW(objRepo),
        delBookMW(objRepo));

    app.get('/author/details/:authorid',
        getAuthorMW(objRepo),
        getBooksByAuthorMW(objRepo),
        renderMW(objRepo, 'author/author-details'));
    app.use('/author/save',
        saveAuthorMW(objRepo),
        renderMW(objRepo, 'author/author-edit'));
    app.use('/author/edit/:authorid',
        getAuthorMW(objRepo),
        saveAuthorMW(objRepo),
        renderMW(objRepo, 'author/author-edit'));
    app.get('/author/del/:authorid',
        getAuthorMW(objRepo),
        getBooksByAuthorMW(objRepo),
        delAuthorMW(objRepo));
    app.use('/author',
        getAuthorsMW(objRepo),
        renderMW(objRepo, 'author/authors'));

    app.use('/',
        getBooksMW(objRepo),
        renderMW(objRepo, 'index'));
};