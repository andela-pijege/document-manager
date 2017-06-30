import path from 'path';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/index');
const serverRoutes = require('./routes/index');
const config = require('./config/config.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
// Set up the express app

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
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
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// serve swagger


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

