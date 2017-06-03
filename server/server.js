const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
const serverRoutes = require('./routes/index')
// Set up the express app
const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
serverRoutes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.

if(process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(port, () => {
      console.log(`Started up at port port ${port}`);
	  });
  });
}

module.exports = app;

