var expect = require('chai').expect;
var getAuthorMW = require('../../../../middleware/author/getAuthorMW');

describe('getAuthorMW middleware ', function () {

  it('should set res.locals.author to an object from db', function (done) {
    const mw = getAuthorMW({
        AuthorModel: {
            findOne: (param, callback) => {
                expect(param).to.be.eql({ _id: '1' });
                callback(null, 'mockauthor');
            }
        }
    });

    const resMock = {
        locals: {}
    };

    mw({
        params: { authorid: '1' }
    }, 
    resMock, 
    (err) => { 
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({ author: 'mockauthor' });
        done(); 
    });
  });

  it('should call next with error when there is a db problem', function (done) {
    const mw = getAuthorMW({
        AuthorModel: {
            findOne: (param, callback) => {
                expect(param).to.be.eql({ _id: '1' });
                callback('hiba történt', null);
            }
        }
    });

    const resMock = {
        locals: {}
    };

    mw({
        params: { authorid: '1' }
    }, 
    resMock, 
    (err) => { 
        expect(err).to.be.eql('hiba történt');
        done(); 
    });
  });
});