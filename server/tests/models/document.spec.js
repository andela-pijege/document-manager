/* eslint-disable */
describe('Document model', () => {
  beforeEach((done) => {
    db.sequelize.sync({force: true}).done(() => {
      db.roles.create({ title: 'admin' })
      db.roles.create({ title: 'regular' })
        .then(() => {
          db.users.create({firstName: 'pHRESH', lastName: 'presh', email: 'presh@presh.com', password: '123456789', roleID: 1 })
          .then((users) => {
            db.documents.create({title: 'ghosts doc', content: 'Ghosts are very real', access: 'private', userID: 1})
            .then(() => {
              done();
            }).catch(error => console.log(error));
          })
        })
    })
  })

  afterEach((done) => {
    db.documents.destroy({where: {}}).then(() => {
      db.users.destroy({ where: {} }).then(() => {
        db.roles.destroy({ where: {} }).then(()  => {
          done();
        });
      })
    })
    .catch(error => console.log(error));
  })

  describe('Create Document', () => {
    it('it should create a new document', (done) => {
      db.documents.create({title: 'precious doc', content: 'precious is very real', access: 'public', userID: 1})
      .then((document) => {
        expect(document.title).to.equal('precious doc');
        done();
      })
    })
  })
  describe('Read Document', () => {
    it('It should fetch an existing document', (done) =>{
      db.documents.findById(1)
        .then((document) => {
          expect(document.title).to.equal('ghosts doc');
          done();
        })
    })
  })
  describe('Update Document', () => {
    it('it should update an existing document', (done) => {
      db.documents.findById(1)
        .then((document) => {
          document.update({title: 'ghosts documentary'})
          .then(() => {
            expect(document.title).to.equal('ghosts documentary');
            expect(document.access).to.equal('private');
            done();
          })
        }).catch(error => console.log('this is the error message', error));
    })
  })
  describe('Delete document', () => {
    it('it should delete an existing document', (done) => {
      db.documents.destroy({where: {id: 1}})
        .then(() => {
          db.documents.findById(1)
            .then((document) => {
              expect(document).to.be.equal(null);
              done();
            })
        })
    })
  })
})