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
    userID: 1,
  },
};

export const document = {
  privateDocument: {
    title: 'test document',
    content: 'this is a private document',
    access: 'Private',
    userID: 1,
  },

  emptyDocument: {
    title: '',
    content: '',
    access: '',
    userID: 1,
  },

  publicDocument: {
    title: 'test document',
    content: 'this is a public document',
    access: 'public',
    userID: 1,
  },
  editDocument: {
    title: 'update test document',
    content: 'this is an updated document',
    access: 'private',
  },
};
