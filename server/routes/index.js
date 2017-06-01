var UserController = require('../controllers/userController');
var DocumentController = require('../controllers/documentController');
var RoleController  = require('../controllers/roleController');

const Routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Documento API by Ghost .........',
  }));

  // users routes
  app.post(
    '/api/users', UserController.create
  );
  app.get(
    '/api/users', UserController.getAll
  );
  app.get(
    '/api/users/:id', UserController.getOneUser
  );
    app.put(
    '/api/users/:id', UserController.update
  );

  app.delete(
    '/api/users/:id', UserController.delete
  );

  // Documentss routes

  app.post(
    '/api/documents', DocumentController.create
  );
  app.get(
    '/api/documents', DocumentController.getAll
  );
  app.get(
    '/api/documents/:id', DocumentController.getOneDocument
  );
  app.put(
    '/api/documents/:id', DocumentController.update
  );
  app.delete(
    '/api/documents/:id', DocumentController.delete
  );
};

module.exports = Routes;