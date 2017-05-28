describe('Document model', () => {
  beforeEach((done) => {
    db.sequelize.sync({force: true}).done(() => {
      db.roles.create({ title: 'admin'})
        .then(() => {
          db.users.create({firstName: 'pHRESH', lastName: 'presh', email: 'presh@presh.com', password: '123456789', roleID: 1 })
          .then(() => {
            db.documents.create({title: 'ghosts doc', content: 'Ghosts are very real', access: 'private', userID: 1})
            .then(() => {
              done();
            })
          })
        })
    })
  })

  afterEach((done) => {
    db.roles.destroy({where: {}}).then(() => {
      done();
    })
  })

  xdescribe('Create Document', () => {
    it('it should create a new document', (done) => {
      db.documents.create({title: 'precious doc', content: 'precious is very real', access: 'public', userID: 1})
      .then((document) => {
        expect(document.title).to.equal('precious doc');
        done();
      })
    })
  })
})