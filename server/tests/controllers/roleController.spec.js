/* eslint-disable */
import supertest from 'supertest';
import server from '../../server';

const app = supertest.agent(server);

describe('Role Controller', () => {
  let token
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      db.roles.create({ title: 'admin' })
        .then(() => {
          db.users.create({ firstName: 'admin', lastName: 'admin', email: 'admin@admin.com', password: 'password', roleID: 1 })
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

  afterEach((done) => {
    db.roles.destroy({ where: {} }).then(() => {
      done();
    });
  });

  describe('Create Role', () => {
    it('Admin should create a role', (done) => {
      const newrole = {
        title: 'reader',
      }
      app
        .post('/api/roles')
        .set('authorization', token)
        .send(newrole)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.eql('role created succesfully');
          done();
        });
    });
  });

  describe('Get all Roles', () => {
    it('Admin should view all roles', (done) => {
      app
        .get('/api/roles')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('roles');
          done();
        });
    });
  });

  describe('Delete a role', () => {
    it('Admin should be able to delete a role given a role ID', (done) => {
      app
        .delete('/api/roles/1')
        .set('authorization', token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.eql('Role deleted successfully');
          done();
        });
    });
  });

  describe('Update a role', () => {
    it('Admin should be able to update a role given a role ID', (done) => {
      const newRole = {
        title: 'Regular'
      };
      app
        .put('/api/roles/1')
        .set('authorization', token)
        .send(newRole)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.eql('Role updated successfully');
          done();
        });
    });
  });
});
