import { adminCheck, ownerCheck, isOwnerOrAdmin } from '../middleware/usersAuthorization';

const UserController = require('../controllers/userController');
const DocumentController = require('../controllers/documentController');
const RoleController = require('../controllers/roleController');
const authorization = require('../middleware/authorization');

const Routes = (app) => {
  app.post(
    '/api/roles', adminCheck, RoleController.create,
  );

  // users routes
  app.post(
    '/api/users', UserController.create,
  );
  app.post(
    '/api/users/login', UserController.login,
  );
  app.get(
    '/api/users', authorization.authorize, adminCheck, UserController.getAll,
  );
  app.get(
    '/api/users/:id', authorization.authorize, adminCheck, UserController.getOneUser,
  );
  app.put(
    '/api/users/:id', authorization.authorize, ownerCheck, UserController.update,
  );
  app.get(
    '/api/users/:id/documents', authorization.authorize, ownerCheck, UserController.getDocuments,
  );

  app.delete(
    '/api/users/:id', authorization.authorize, isOwnerOrAdmin, UserController.delete,
  );

  app.get(
    '/api/search/users/?', authorization.authorize, UserController.searchUser,
  );

  // Documentss routes

  app.post(
    '/api/documents', authorization.authorize, DocumentController.create,
  );
  app.get(
    '/api/documents', authorization.authorize, DocumentController.getAll,
  );
  app.get(
    '/api/documents/public', DocumentController.getAllPublic,
  );
  app.get(
    '/api/documents/:id', authorization.authorize, DocumentController.getOneDocument,
  );
  app.put(
    '/api/documents/:id', authorization.authorize, ownerCheck, DocumentController.update,
  );
  app.delete(
    '/api/documents/:id', authorization.authorize, ownerCheck, DocumentController.delete,
  );
  app.get(
    '/api/search/documents/?', authorization.authorize, DocumentController.searchPublicDocuments,
  );
  app.get(
    '/api/search/myDocuments/?', authorization.authorize, DocumentController.searchMyDocuments,
  );
};

module.exports = Routes;
