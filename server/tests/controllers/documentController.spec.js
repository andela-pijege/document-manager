/* eslint-disable */
import supertest from 'supertest';
import server from '../../server';
import { document } from '../testData';

const app = supertest.agent(server);

describe('Document Controller', () => {
  let token;
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      db.roles.create({ title: 'admin' })
        .then(() => {
          db.roles.create({ title: 'regular' })
            .then(() => {
              db.users.create({ firstName: 'admin', lastName: 'admin', email: 'admin@admin.com', password: 'password', roleID: 1 })
                .then(() => {
                  db.users.create({ firstName: 'ghost', lastName: 'ghost', email: 'ghost@ghost.com', password: 'password', roleID: 2 })
                    .then(() => {
                      db.documents.create({ title: 'admindocument', content: 'this is admins public document', access: 'public', userID: 1 })
                        .then(() => {
                          db.documents.create({ title: 'userdocument', content: 'this is user public document', access: 'public', userID: 2 })
                            .then(() => {
                              app
                                .post('/api/users/login')
                                .send({
                                  email: 'admin@admin.com',
                                  password: 'password',
                                })
                                .end((error, response) => {
                                  token = response.body.token;
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });
  afterEach((done) => {
    db.roles.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe('Get all public  Documents', () => {
    it('it should GET all documents', (done) => {
      app
        .get('/api/documents/public')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });

  describe('create a new document', () => {
    it('it should create a new document', (done) => {
      app
        .post('/api/documents')
        .set('authorization', token)
        .send(document.publicDocument)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message');
          expect(response.body).to.have.property('message').eql('Document created successfully');
          done();
        });
    });
  });

  describe('Get a document using the id', () => {
    it('it should get a document with the passed param as id ', (done) => {
      app
        .get('/api/documents/2')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an.instanceof(Object);
          expect(response.body).to.not.be.null;
          expect(response.body).to.have.property('id').eql(2);
          expect(response.body).to.have.property('title');
          expect(response.body).to.have.property('access');
          expect(response.body).to.have.property('content');
          done();
        });
    });
  });

  describe('/Update a users document', () => {
    it('it should update a document with the passed param as id ', (done) => {
      app
        .put('/api/documents/1')
        .set('authorization', token)
        .send(document.editDocument)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').eql('Document updated successfully');
          done();
        });
    });
  });

  describe('Delete a document using the id', () => {
    it('it should delete a document with the passed param as id ', (done) => {
      app
        .delete('/api/documents/1')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').eql('Document successfully deleted');
          done();
        });
    });
  });
});
