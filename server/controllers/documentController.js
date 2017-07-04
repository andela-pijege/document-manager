const Documents = require('../models').documents;

const documentController = {
  /**
   * @desc Create a new document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    if (req.decoded.id !== parseInt(req.body.userID, 10)) {
      return res.status(401).send({ message: 'UNAUTHORISED USER' });
    }
    Documents
      .create(req.body)
      .then((document) => {
        res.status(200).send({ message: 'Document created successfully' });
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc Get all public documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAllPublic(req, res) {
    Documents
      .findAll({
        where: { access: 'public' },
      })
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error =>
        res.status(400).json({ msg: error.message }),
      );
  },
  /**
   * @desc Get all roles document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAllRoles(req, res) {
    let searchValue;
    (req.decoded.roleID === 1) ? searchValue = 'admin' : searchValue = 'regular';
    Documents
      .findAll({
        where: { access: searchValue },
      })
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error =>
        res.status(400).json({ msg: error.message }),
      );
  },
  /**
   * @desc Get all documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAll(req, res) {
    Documents
      .findAll()
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc Get all personal documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getDocuments(req, res) {
    Documents
      .findAll({
        where: { userID: req.params.id },
      })
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error =>
        res.status(400).json({ msg: error.message }),
    );
  },
  /**
   * @desc Get one document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getOneDocument(req, res) {
    Documents
      .findById(req.params.id)
      .then((document) => {
        if (document) {
          return res.status(200).send(document);
        } else {
          return res.status(404).send({ message: 'document not found' });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc search for public document(s)
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  searchPublicDocuments(req, res) {
    const { title } = req.query;
    Documents
      .findAll({
        where: { title: { $iLike: `%${title}%` }, access: 'public' },
      })
      .then((documents) => {
        res.status(200).send({ documents, message: 'user found' });
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc Search my personal documets
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  searchMyDocuments(req, res) {
    const { title } = req.query;
    Documents
      .findAll({
        where: { title: { $iLike: `%${title}%` }, userID: req.decoded.id },
      })
      .then((documents) => {
        res.status(200).send({ documents, message: 'user found' });
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc Updates document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  update(req, res) {
    const docId = req.decoded.id;
    Documents
      .findById(req.params.id)
      .then((document) => {
        if (document.userID !== docId) {
          return res.status(401).send({ message: 'UNAUTHORISED USER' });
        }
        if (document.userID === docId) {
          document
            .update(req.body)
            .then(() => res.status(200).send({ message: 'Document updated successfully' }));
        } else {
          return res.status(404).send({ message: 'Document not found' });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  /**
   * @desc Deletes document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  delete(req, res) {
    const docId = req.decoded.id;
    Documents
      .findById(req.params.id)
      .then((document) => {
        if (document.userID !== docId) {
          return res.status(401).send({ message: 'UNAUTHORISED USER' });
        }
        if (document.userID === docId) {
          document
            .destroy()
            .then(() => res.status(200).send({ message: 'Document successfully deleted' }));
        } else {
          res.status(404).send({ message: 'Document not found' });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};

module.exports = documentController;
