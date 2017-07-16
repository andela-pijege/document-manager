export const user = {
  id: 1,
  firstName: 'eyo',
  lastname: 'eyo',
  password: 'password',
  email: 'eyo@eyo.com',
  roleID: 2,
};
export const user1 = {
  id: 1,
  firstName: 'eyo',
  lastname: 'eyo',
  email: 'eyo@eyo.com',
  roleID: 2,
};
export const allUsers = {
  users: [
    { id: 1, firstName: 'hope', lastName: 'hope', email: 'hope@hope.com', roleID: 2 },
    { id: 2, firstName: 'tom', lastName: 'tom', email: 'tom@tom.com', roleID: 2 },
    { id: 3, firstName: 'jed', lastName: 'jed', email: 'jed@jed.com', roleID: 2 },
    { id: 4, firstName: 'kai', lastName: 'kai', email: 'kai@kai.com', roleID: 2 }
  ],
  metaData: {
    'totalCount': 4,
    'pages': 2,
    'currentPage': 1,
    'pageSize': 2
  }
};

export const publicDocuments = {
  users: [
    { id: 1, title: 'hope', content: 'hope', access: 'public', userID: 2 },
    { id: 2, title: 'tom', content: 'tom', access: 'public', userID: 4 },
    { id: 3, title: 'jed', content: 'jed', access: 'public', userID: 6 },
    { id: 4, title: 'kai', content: 'kai', access: 'public', userID: 9 }
  ],
  metaData: {
    'totalCount': 4,
    'pages': 2,
    'currentPage': 1,
    'pageSize': 2
  }
};

export const document = {
  id: 1,
  title: 'test',
  content: 'testing',
  access: 'public',
  userID: 2,
};
