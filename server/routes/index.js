import { adminCheck, ownerCheck, isOwnerOrAdmin } from '../middleware/usersAuthorization';

const UserController = require('../controllers/userController');
const DocumentController = require('../controllers/documentController');
const RoleController = require('../controllers/roleController');
const authorization = require('../middleware/authorization');

const Routes = (app) => {
   /**
   * @swagger
   * definition:
   *   Roles:
   *     properties:
   *       title:
   *         type: string
   */
  /**
   * @swagger
   * definition:
   *   Users:
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         type: string
   */
    /**
   * @swagger
   * definition:
   *   Documents:
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       access:
   *         type: string
   */

  // ROLES API ENDPOINT ROUTES

   /**
   * @swagger
   * /api/roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Creates a new role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: Role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Roles'
   *     responses:
   *       200:
   *         description: role created succesfully
   */
  app.post(
    '/api/roles', adminCheck, RoleController.create,
  );

  // USERS API ENDPOINT ROUTES

  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: user created succesfully
   */
  app.post(
    '/api/users', UserController.create,
  );
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: sign a user into the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Login successful
   */
  app.post(
    '/api/users/login', UserController.login,
  );

  /**
   * @swagger
   * /api/users/:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/users/', authorization.authorize, adminCheck, UserController.getAll,
  );

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single user
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/users/:id', authorization.authorize, adminCheck, UserController.getOneUser,
  );
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags: Users
   *     description: Updates a single user
   *     produces: application/json
   *     parameters:
   *       name: user
   *       in: body
   *       description: Fields for the User resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully updated
   */
  app.put(
    '/api/users/:id', authorization.authorize, ownerCheck, UserController.update,
  );
  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     description: Deletes a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: User successfully Deleted
   */
  app.delete(
    '/api/users/:id', authorization.authorize, isOwnerOrAdmin, UserController.delete,
  );

  /**
   * @swagger
   * /api/search/users/?:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/search/users/?', authorization.authorize, UserController.searchUser,
  );

  // Documentss routes

  /**
   * @swagger
   * /api/documents:
   *   post:
   *     tags:
   *       - Documents
   *     description: Creates a new document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: document
   *         description: Document object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post(
    '/api/documents', authorization.authorize, DocumentController.create,
  );
  app.get(
    '/api/documents', authorization.authorize, DocumentController.getAll,
  );

  /**
   * @swagger
   * /api/users/{id}/documents:
   *   get:
   *     tags:
   *       - Users Documents
   *     description: Returns all of the users Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/users/:id/documents', authorization.authorize, ownerCheck, DocumentController.getDocuments,
  );

  /**
   * @swagger
   * /api/documents/public:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all public Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/documents/public', DocumentController.getAllPublic,
  );

    /**
   * @swagger
   * /api/documents/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/documents/:id', authorization.authorize, DocumentController.getOneDocument,
  );

  /**
   * @swagger
   * /api/documents/{id}:
   *   put:
   *     tags: Documents
   *     description: Updates a single document
   *     produces: application/json
   *     parameters:
   *       name: document
   *       in: body
   *       description: Fields for the Document resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Document updated successfully
   */
  app.put(
    '/api/documents/:id', authorization.authorize, DocumentController.update,
  );

  /**
   * @swagger
   * /api/documents/{id}:
   *   delete:
   *     tags:
   *       - Documents
   *     description: Deletes a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Document successfully deleted
   */
  app.delete(
    '/api/documents/:id', authorization.authorize, DocumentController.delete,
  );

  /**
   * @swagger
   * /api/search/Documents/?:
   *   get:
   *     tags:
   *       - Documents
   *     description: search through public documents and Returns all documents based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/search/documents/?', authorization.authorize, DocumentController.searchPublicDocuments,
  );

  /**
   * @swagger
   * /api/search/myDocuments/?:
   *   get:
   *     tags:
   *       - Documents
   *     description: search through my documents and Returns all documents based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/search/myDocuments/?', authorization.authorize, DocumentController.searchMyDocuments,
  );
};

module.exports = Routes;
