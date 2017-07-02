
import supertest from 'supertest';
import server from '../../server';
import { userData } from '../testData';

const app = supertest.agent(server);

describe('User controller', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      db.roles.create({ title: 'admin' })
      db.roles.create({ title: 'regular' })
        .then(() => {
          db.users.create({ firstName: 'admin', lastName: 'admin', email: 'admin@admin.com', password: 'password', roleID: 1 })
          db.users.create({ firstName: 'ghost', lastName: 'ghost', email: 'ghost@ghost.com', password: 'password', roleID: 2 })
            .then(() => {
              app
              .post('/api/users/login')
              .send({
                email: 'admin@admin.com',
                paswword: 'password',
              })
              .end((error, response) => {
                console.log(';::::::::::::::::::::::::::', response);
              });
              done();
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
    it.only('should create a regular user and return a status of 201 when successful', (done) => {
      app
        .post('/api/users')
        .send(userData.newUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
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
          expect(response.body.user.firstName).to.equal('ghost');
          expect(response.body.user.lastName).to.equal('ghost');
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
  describe('Delete a user', () => {
    it('delete a user', (done) => {
      app
        .post()
        .send()
        .end((error, response) => {
          expect('true').to.equal('true');
        });
    });
  });
});
