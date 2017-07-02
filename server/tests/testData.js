// import faker from 'faker';
import models from '../models';

export const roles = {
  admin: {
    title: 'admin',
  },

  regular: {
    title: 'regular',
  },
};

export const userData = {

  newUser: {
    firstName: 'fidel',
    lastName: 'castro',
    email: 'fidel@castro.com',
    password: 'password',
    roleID: 2,
  },
  invalidUser: {
    firstName: 'fidel',
    lastName: 'castro',
    email: 'ghost@ghost.com',
    password: 'password',
    roleID: 2,
  },
  emptyUser: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleID: 2,
  },
};

export const adminData = {
  adminUser: {
    firstname: 'admin',
    lastname: 'admin',
    email: 'admin@admin.com',
    password: 'password',
    roleId: 1,
  },

//   adminUser2: {
//     firstname: 'Mai',
//     lastname: 'Iles',
//     username: 'maiiles',
//     email: 'mai@iles.com',
//     password: 'password',
//     roleId: 1
//   },

//   regularUser1: {
//     firstname: 'Hope',
//     lastname: 'Tommy',
//     username: 'hopetommy',
//     email: 'hope@tommy.com',
//     password: 'password',
//     roleId: 2
//   },

//   regularUser2: {
//     firstname: faker.name,
//     lastname: faker.name,
//     username: faker.username,
//     email: faker.email,
//     password: 'password',
//     roleId: 2
//   },

//   fakeUser: {
//     firstname: 'faker',
//     lastname: 'faker',
//     username: 'faker',
//     email: 'fake@email.com',
//     password: 'password',
//     roleId: 2
//   }
};

// export const document = {
//   document1: {
//     title: 'seed document test',
//     content: faker.lorem.paragraph(),
//     viewAccess: 'Private',
//     ownerId: 1
//   },

//   document2: {
//     title: 'public seed document test',
//     content: faker.lorem.paragraph(),
//     viewAccess: 'Public',
//     ownerId: 1
//   },

//   newDocument1: {
//     title: 'New Doc 1',
//     content: faker.lorem.paragraph(2),
//     viewAccess: 'Private',
//     ownerId: 1
//   },
//   newDocument2: {
//     title: 'New Doc 2',
//     content: faker.lorem.paragraph(2),
//     viewAccess: 'Private',
//     ownerId: 1
//   },
//   emptyDocument: {
//     title: '',
//     content: faker.lorem.paragraph(2),
//     viewAccess: 'Private',
//     ownerId: 1
//   }
// };