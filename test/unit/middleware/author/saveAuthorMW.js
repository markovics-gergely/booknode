var expect = require('chai').expect;
var saveAuthorMW = require('../../../../middleware/author/saveAuthorMW');

describe('saveAuthorMW middleware ', function () {

    it('should redirect to /author on save', function (done) {
        const mw = saveAuthorMW({
            AuthorModel: 'au'
        });

        mw({
            body: {
                name: 'name',
                bornPlace: 'bornPlace',
                bornTime: '2000-01-02',
                alias: 'alias',
                deathPlace: 'deathPlace',
                deathTime: '2020-03-01'
            },
            params: { authorid: '1' }
        }, 
        {
            locals: {
                author: {
                    save: (callback) => {
                        callback(null);
                    }
                }
            },
            redirect: where => {
                expect(where).to.be.eql('/author');
                done();
            }
        }, 
        (err) => { 
            //no next
            done(); 
        });
    });

    it('should set res.locals.author with an autho object created by the MW', function (done) {
        class AuthorMockModel {
            save(callback) {
                callback(null);
            }
        }

        const mw = saveAuthorMW({
            AuthorModel: AuthorMockModel
        });

        mw({
            body: {
                name: 'name',
                bornPlace: 'bornPlace',
                bornTime: '2000-01-02',
                alias: 'alias',
                deathPlace: 'deathPlace',
                deathTime: '2020-03-01'
            },
            params: { authorid: '1' }
        }, 
        {
            locals: {
            },
            redirect: where => {
                expect(where).to.be.eql('/author');
                done();
            }
        }, 
        (err) => { 
            //no next
            done(); 
        });
    });

  it('should call next with error if there is a db error', function (done) {
    const mw = saveAuthorMW({
        AuthorModel: 'au'
    });

    mw({
        body: {
            name: 'name',
            bornPlace: 'bornPlace',
            bornTime: '2000-01-02',
            alias: 'alias',
            deathPlace: 'deathPlace',
            deathTime: '2020-03-01'
        },
        params: { authorid: '1' }
    }, 
    {
        locals: {
            author: {
                save: (callback) => {
                    callback('hiba történt');
                }
            }
        },
        redirect: where => {
            done();
        }
    }, 
    (err) => { 
        //no next
        expect(err).to.be.eql('hiba történt');
        done();
    });
  });
});