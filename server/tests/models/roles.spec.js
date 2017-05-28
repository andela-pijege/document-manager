describe('Roles model', () => {
  beforeEach((done) => {
		db.sequelize.sync({force: true}).done(() => {
			db.roles.create({title: 'admin'}).then(() => {
				done();
			})
		})
	})
	afterEach((done) => {
		db.roles.destroy({where: {}}).then(() => {
			done();
		})
	})

	describe('Create role', () => {
		it('should create a new role', (done) => {
			db.roles.create({ title: 'regular' })
				.then((role) => {
					expect(role.title).to.equal('regular');
					done();
				})
		})
		it('should return error for invalid input', (done) => {
			db.roles.create({ title: null })
				.catch((error) => {
					expect(error.message).to.equal('notNull Violation: title cannot be null');
					done();
				})
		})
	})

	describe('Read role', () => {
		it('it should fetch a single role', (done) => {
			db.roles.findById(1)
				.then((role) => {
					expect(role.title).to.equal('admin');
					done();
				})
		})
	})

	describe('Update role', () => {
		it('it should update an existing role', (done) => {
			db.roles.findById(1)
				.then((role) => {
					role.update({ title: 'regular' })
						.then((updatedRole) => {
							expect(role.title).to.equal('regular');
							done();
						})
				})
		})
	})

	describe('Delete role', () => {
		it('it should delete an existing role', (done) => {
			db.roles.destroy({ where: { id: 1 } })
				.then(() => {
					db.roles.findById(1)
						.then((role) => {
							expect(role).to.equal(null);
							done();
						})
				})
		})
	})

})