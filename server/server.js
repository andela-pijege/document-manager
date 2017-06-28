import path from 'path';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
const serverRoutes = require('./routes/index');
const config = require('./config/config.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Set up the express app

dotenv.config();
const app = express();

const port = process.env.PORT || 9000;
// app.set('port', port);

app.set('my secret key', process.env.secret);

// Log requests to the console.
app.use(logger('dev'));
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

serverRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

console.log(`Started up at port port ${port}`);

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log(port);
      }
      console.log(`Started up at port port ${port}`);
    });
  });
}

module.exports = app;

