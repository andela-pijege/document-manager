const Documents = require('../models').documents;

const documentController = {
  create(req, res) {
    Documents
      .create(req.body)
      .then((document) => {
        res.status(200).send({ message: 'Document created successfully' });
      })
      .catch(error => res.status(400).send(error));
  },
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
  getAll(req, res) {
    Documents
      .findAll()
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error => res.status(400).send(error));
  },
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
      .catch(error => res.status(500).send(error));
  },
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
      .catch(error => res.status(500).send(error));
  },
};

module.exports = documentController;
