import path from 'path';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
const serverRoutes = require('./routes/index');
const jwt = require('jsonwebtoken');
// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 9000;
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

serverRoutes(app);

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(port, () => {
      console.log(`Started up at port port ${port}`);
    });
  });
}

module.exports = app;

