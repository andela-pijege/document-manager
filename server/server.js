import path from 'path';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
const serverRoutes = require('./routes/index');
const config = require('./config/config.json');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Set up the express app

dotenv.config();
const app = express();

const port = process.env.PORT || 9000;
// app.set('port', port);

app.set('my secret key', config.secret);

// Log requests to the console.
app.use(logger('dev'));
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

serverRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(port, () => {
      console.log(`Started up at port port ${port}`);
    });
  });
}

module.exports = app;

