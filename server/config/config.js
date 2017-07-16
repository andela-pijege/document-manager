require('dotenv').config();

const environment = {
  'development': {
    url: process.env.DATABASE_URL,
    'dialect': 'postgres',
  },
  'test': {
    url: process.env.TEST_DATABASE_URL,
    'dialect': 'postgres',
    logging: false,
  },
  'production': {
    url: process.env.DATABASE_URL,
    'dialect': 'postgres',
  }

};

const env = process.env.NODE_ENV || 'development';
module.exports = environment[env];
