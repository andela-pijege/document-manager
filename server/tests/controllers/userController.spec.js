/* eslint-disable */
import supertest from 'supertest';
import server from '../../server';
import { userData } from '../testData';

const app = supertest.agent(server);

describe('User controller', () => {
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

  afterEach((done) => {
    db.roles.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe('Create User', () => {
    it('should create a regular user and return a status of 201 when successful', (done) => {
      app
        .post('/api/users')
        .send(userData.newUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.user).to.have.property('id');
          expect(response.body.user).to.have.property('firstName');
          expect(response.body.user).to.have.property('lastName');
          expect(response.body.user).to.have.property('email');
          expect(response.body.user).to.have.property('roleID');
          done();
        });
    });
  });

  describe('should not create user', () => {
    it('should not create a regular user with an already existing mail and return a status of 400', (done) => {
      app
        .post('/api/users')
        .send(userData.invalidUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.errors[0].message).to.equal('This email is already in use');
          done();
        });
    });
  });

  describe('Reject empty fields', () => {
    it('should not create user with empty fields', (done) => {
      app
        .post('/api/users')
        .send(userData.emptyUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.errors[0].message).to.equal('password cannot be less than 8 characters');
          expect(response.body.errors[1].message).to.equal('firstName can only contain letters and/or -');
          expect(response.body.errors[2].message).to.equal('firstName cannot be less than 2 or greater than 12 characters');
          expect(response.body.errors[3].message).to.equal('lasttName can only contain letters and/or -');
          expect(response.body.errors[4].message).to.equal('lastName cannot be less than 2 or greater than 12 characters');
          expect(response.body.errors[5].message).to.equal('Email is not valid');
          done();
        });
    });
  });

  describe('Login User', () => {
    it('should successfully log user in', (done) => {
      app
        .post('/api/users/login')
        .send({
          email: 'ghost@ghost.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Login successful');
          expect(response.body.token).to.exist;
          expect(response.body.user).to.have.property('id');
          expect(response.body.user).to.have.property('firstName');
          expect(response.body.user).to.have.property('lastName');
          expect(response.body.user).to.have.property('email');
          expect(response.body.user).to.have.property('roleID');
          done();
        });
    });
  });
  describe('Should not log in user with wrong details', () => {
    it('return an error message', (done) => {
      app
        .post('/api/users/login')
        .send({
          email: 'ghost@ghost.com',
          password: 'fakepassword',
        })
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
  describe('Get all users', () => {
    it('gets all users', (done) => {
      app
        .get('/api/users/')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Get user with a given id', () => {
    it('should get a user with a given id', (done) => {
      app
        .get('/api/users/2')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('lastName');
          expect(response.body).to.have.property('firstName');
          expect(response.body).to.have.property('email');
          expect(response.body).to.have.property('password');
          expect(response.body).to.have.property('roleID');
          expect(response.body).to.have.property('id').eql(2);
          done();
        });
    });
  });
  describe('Delete user', () => {
    it('Admin should DELETE a user given the id', (done) => {
      app
        .delete('/api/users/2')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.equal('User successfully Deleted');
          expect(response.error).to.equal(false);
          done();
        });
    });
  });
});
