/* eslint-disable */
describe('Users model', () => {
  beforeEach((done) => {
    db.sequelize.sync({force: true}).done(() => {
      db.roles.create({ title: 'admin' })
        .then(() => {
          db.users.create({firstName: 'pHRESH', lastName: 'presh', email: 'presh@presh.com', password: '123456789', roleID: 1 })
          .then(() => {
            done();
          })
      })
    })
  })
  
  afterEach((done) => {
    db.roles.destroy({where: {}}).then(() => {
      done();
    })
  })

  describe('Create User', () => {
    it('should create a new user', (done) => {
      db.users.create({firstName: 'ghost', lastName: 'ghost', email: 'ghost@ghost.com', password: 'ghost2345678', roleID: 1})
        .then((user) => {
          expect(user.firstName).to.equal('ghost');
          expect(user.lastName).to.equal('ghost');
          expect(user.email).to.equal('ghost@ghost.com');
          done();
        })
    })
  })

  describe('Read user', () => {
    it('it should fetch a user details', (done) => {
      db.users.findById(1)
        .then((user) => {
          expect(user.lastName).to.equal('presh');
          done();
        })
    })
  })
  describe('Update user', () => {
    it('it should update an existing user', (done) => {
      db.users.findById(1)
        .then((user) => {
          user.update({firstName: 'precious' })
            .then(() => {
              expect(user.firstName).to.equal('precious');
              expect(user.lastName).to.equal('presh');
              expect(user.email).to.equal('presh@presh.com');
              done();
            })
        })
    })
  })

  describe('Delete user', () => {
    it('it should delete an existing user', (done) => {
      db.users.destroy({where: {id: 1 } })
        .then(() => {
          db.users.findById(1)
            .then((user) => {
              expect(user).to.be.equal(null);
              done();
            })
        })
    })
  })
})