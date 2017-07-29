const Documents = require('../models').documents;

const metaData = (documents, limit, offset) => {
  return {
    totalCount: documents.count,
    pages: Math.ceil(documents.count / limit),
    currentPage: Math.floor(offset / limit) + 1,
    pageSize: documents.rows.length,
  };
};

const documentController = {
  /**
   * @desc Create a new document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    if ((req.body.title === '' || undefined) || (req.body.access === '' || undefined)) {
      return res.status(400).send({ message: 'Input fields cannot be empty' });
    }
    if (req.decoded.id !== parseInt(req.body.userID, 10)) {
      return res.status(403).send({ message: 'UNAUTHORISED USER' });
    }
    return Documents
      .create(req.body)
      .then((document) => {
        res.status(201).send({ message: 'Document created successfully' });
      })
      .catch(error => res.status(500).send({ msg: 'Server error', error }));
  },
  /**
   * @desc Get all public documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAllPublic(req, res) {
    const limit = req.query.limit ? req.query.limit : 10;
    const offset = req.query.offset ? req.query.offset : 0;
    Documents
      .findAndCountAll({
        limit,
        offset,
        where: { access: 'public' },
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }


        return res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error =>
        res.status(500).send({ msg: 'Server error', error }),
    );
  },

  /**
   * @desc Get all roles document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getRolesDocuments(req, res) {
    const limit = req.query.limit ? req.query.limit : 10;
    const offset = req.query.offset ? req.query.offset : 0;
    if (req.decoded.roleID === 1) {
      return Documents.findAndCountAll({
        limit,
        offset,
        where: {
          $or: [
            { access: 'admin' },
            { access: 'regular' }
          ]
        }
      })
        .then((documents) => {
          if (!documents) {
            return res.status(404).send({ message: 'No document found' });
          }

          res.status(200).send({
            documents: documents.rows,
            metaData: metaData(documents, limit, offset),
          });
        })
        .catch(error => res.status(500).send({ msg: 'Server error', error }));
    }
    return Documents
      .findAndCountAll({
        limit,
        offset,
        where: { access: 'regular' }
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }


        res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error =>
        res.status(500).send({ msg: 'Server error', error })
      );
  },
  /**
   * @desc Get all personal documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getDocuments(req, res) {
    const limit = req.query.limit ? req.query.limit : 10;
    const offset = req.query.offset ? req.query.offset : 0;
    Documents
      .findAndCountAll({
        limit,
        offset,
        where: { userID: req.params.id },
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }

        res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error =>
        res.status(500).send({ msg: 'Server error', error }),
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
      .catch(error => res.status(400).send({ msg: 'Server error', error }));
  },
  /**
   * @desc search for public document(s)
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  searchPublicDocuments(req, res) {
    const limit = req.query.limit ? req.query.limit : 10;
    const offset = req.query.offset ? req.query.offset : 0;
    const { title } = req.query;
    Documents
      .findAndCountAll({
        limit,
        offset,
        where: { title: { $iLike: `%${title}%` }, access: 'public' },
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }

        res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error => res.status(500).send({ msg: 'Server error', error }));
  },
  /**
   * @desc Search my personal documets
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  searchMyDocuments(req, res) {
    const limit = req.query.limit ? req.query.limit : 9;
    const offset = req.query.offset ? req.query.offset : 0;
    const { title } = req.query;
    Documents
      .findAndCountAll({
        limit,
        offset,
        where: { title: { $iLike: `%${title}%` }, userID: req.decoded.id },
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }

        res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error => res.status(500).send({ msg: 'Server error', error }));
  },

  /**
   * @desc Search my personal documets
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  searchRoleDocuments(req, res) {
    const limit = req.query.limit ? req.query.limit : 9;
    const offset = req.query.offset ? req.query.offset : 0;
    const { title } = req.query;
    let roleType;
    (req.decoded.roleID === 1) ? roleType = 'admin' : roleType = 'regular';
    Documents
      .findAndCountAll({
        limit,
        offset,
        where: { title: { $iLike: `%${title}%` }, access: roleType },
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({ message: 'No document found' });
        }
        res.status(200).send({
          documents: documents.rows,
          metaData: metaData(documents, limit, offset),
        });
      })
      .catch(error => res.status(500).send({ msg: 'Server error', error }));
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
          return res.status(403).send({ message: 'UNAUTHORISED USER' });
        }
        if (document.userID === docId) {
          document
            .update(req.body)
            .then(() => res.status(200).send({ message: 'Document updated successfully' }));
        } else {
          return res.status(404).send({ message: 'Document not found' });
        }
      })
      .catch(error => res.status(500).send({ msg: 'Server error', error }));
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
          return res.status(403).send({ message: 'UNAUTHORISED USER' });
        }
        if (document.userID === docId) {
          document
            .destroy()
            .then(() => res.status(200).send({ message: 'Document successfully deleted' }));
        } else {
          res.status(404).send({ message: 'Document not found' });
        }
      })
      .catch(error => res.status(400).send({ msg: error.message }));
  },
};

module.exports = documentController;
