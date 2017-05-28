const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
// Set up the express app
const app = express();


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the Documento API.',
}));

db.sequelize.sync({ force: true }).done(() => {
  app.listen(port, () => {
  console.log(`Started up at port port ${port}`);
	});
});

