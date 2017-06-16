const UserController = require('../controllers/userController');
const DocumentController = require('../controllers/documentController');
const RoleController = require('../controllers/roleController');

const Routes = (app) => {
  // app.get('/', (req, res) => res.status(200).send({
  //   message: 'Welcome to the Documento API by Ghost .........',
  // }));

  app.post(
    '/api/roles', RoleController.create,
  );

  // users routes
  app.post(
    '/api/users', UserController.create,
  );
  app.post(
    '/api/users/login', UserController.login,
  );
  app.get(
    '/api/users', UserController.getAll,
  );
  app.get(
    '/api/users/:id', UserController.getOneUser,
  );
  app.put(
    '/api/users/:id', UserController.update,
  );
  app.get(
    '/api/users/:id/documents', UserController.getDocuments,
  );

  app.delete(
    '/api/users/:id', UserController.delete,
  );

  // Documentss routes

  app.post(
    '/api/documents', DocumentController.create,
  );
  app.get(
    '/api/documents', DocumentController.getAll,
  );
  app.get(
    '/api/documents/:id', DocumentController.getOneDocument,
  );
  app.put(
    '/api/documents/:id', DocumentController.update,
  );
  app.delete(
    '/api/documents/:id', DocumentController.delete,
  );
};

module.exports = Routes;
