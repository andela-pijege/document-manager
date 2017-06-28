require('dotenv').config();

const environment = {
  'development': {
    url: process.env.DATABASE_URL,
    'dialect': 'postgres'
  },
  'test': {
    url: process.env.TEST_DATABASE_URL,
    'dialect': 'postgres'
  },
  'production': {
    url: process.env.DATABASE_URL,
    'dialect': 'postgres'
  }

};

const env = process.env.NODE_ENV || 'development';
module.exports = environment[env];
// {
//   "development": {
//     "username": "andeladeveloper",
//     "password": null,
//     "database": "document-manager",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "andeladeveloper",
//     "password": null,
//     "database": "document-manager-test",
//     "host": "127.0.0.1",
//     "dialect": "postgres",
//     "logging": false
//   },
//   "production": {
//     "username": "postgres",
//     "password": null,
//     "database": "document-manager",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }
