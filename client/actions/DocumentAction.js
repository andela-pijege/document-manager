import axios from 'axios';
import toastr from 'toastr';
import * as actionTypes from './ActionTypes';

/**
 *
 * @desc get user documents action creator.
 * @param {array} documents
 * @returns {object} actiontype, and payload
 */
export const getDocuments = documents =>
  ({ type: actionTypes.GET_USER_DOCUMENT, documents });

/**
 *
 * @desc calls the get user document endpoint.
 *  Retrieves documents for a specific user.
 * @param {integer} userID
 * @param {number} limit Represents pagination index.
 * @param {number} offset Represents pagination index.
 * @returns {array} returns an array of a specific users document.
 */
export const getUserDocuments = (userID, limit, offset) => {
  return dispatch => axios.get(`/api/users/${userID}/documents?limit=${limit || 9}&offset=${offset || 0}`)
    .then((response) => {
      dispatch(getDocuments(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Delete Existing Document
 * @desc Delete a Single Document
 * @param {object} docID - id of deleted document
 * @returns {object} action
 */
export const deleteDocument = docID =>
  ({ type: actionTypes.DELETE_USER_DOCUMENT, docID });

/**
 * Delete Document
 * @desc Deletes an existing document
 * @param {number} docID - document id
 * @returns {object} action
 */
export const deleteUserDocument = (docID) => {
  return dispatch => axios.delete(`/api/documents/${docID}`)
    .then((response) => {
      dispatch(deleteDocument(docID));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * View a single Document
 * @desc view a Single Document
 * @param {object} document - document to be viewed
 * @returns {object} action
 */
export const viewDocument = document =>
  ({ type: actionTypes.GET_ONE_DOCUMENT_SUCCESS, document });

/**
 * View Document
 * @desc View document
 * @param {number} docID - document id
 * @returns {object} action
 */
export const getOneDocument = (docID) => {
  return dispatch => axios.get(`/api/documents/${docID}`)
    .then((response) => {
      dispatch(viewDocument(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * createDocument
 * @desc adds a new document to users list of document
 * @param {object} response response from server
 * @returns {object} action
 */
export const createDocument = response =>
  ({ type: actionTypes.CREATE_DOCUMENT_SUCCESS, response });


/**
 * create Document
 * @desc Create a new document
 * @param {object} documentData document details
 * @returns {object} action
 */
export const createUserDocument = (documentData) => {
  return dispatch => axios.post('/api/documents', documentData)
    .then((response) => {
      dispatch(createDocument(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Update Existing Document
 * @desc Update a Single Document
 * @param {object} response - response from the server
 * @returns {object} action
 */
export const updateDocument = response =>
  ({ type: actionTypes.UPDATE_DOCUMENT_SUCCESS, response });

/**
 * Update Document
 * @desc Update an existing document
 * @param {object} documentData - document details
 * @returns {object} action
 */
export const updateUserDocument = (documentData) => {
  return dispatch => axios.put(`/api/documents/${documentData.id}`, documentData)
    .then((response) => {
      dispatch(updateDocument(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Get Public Documents
 * @desc Gets all public Documents
 * @param {array} documents - response from the server
 * @returns {object} action
 */
export const getPublicDocuments = documents =>
  ({ type: actionTypes.GET_ALL_PUBLIC_DOCUMENTS, documents });

/**
 * Public documents
 * @desc gets all public documents
 * @param {number} limit
 * @param {number} offset
 * @returns {object} action
 */
export const getAllPublicDocuments = (limit, offset) => {
  return dispatch => axios.get(`/api/documents?limit=${limit || 9}&offset=${offset || 0}`)
    .then((response) => {
      dispatch(getPublicDocuments(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Search Public Documents
 * @desc search public Documents
 * @param {array} documents - response from the server
 * @returns {object} action
 */
export const searchPublic = documents =>
  ({ type: actionTypes.SEARCH_PUBLIC_DOCUMENTS, documents });

/**
 * Search Public Document
 * @desc search for a document in Public documents
 * @param {string} document - document details
 * @returns {object} action
 */
export const searchPublicDocuments = (document) => {
  return dispatch => axios.get(`/api/search/documents/?title=${document}`)
    .then((response) => {
      dispatch(searchPublic(response.data.documents));
    })
    .catch((error) => {
      toastr.error(error);
    });
};

/**
 * Search my Documents
 * @desc search personal Documents
 * @param {array} documents - response from the server
 * @returns {object} action
 */
export const searchMyDocuments = documents =>
  ({ type: actionTypes.SEARCH_MY_DOCUMENTS, documents });

/**
 * Search personal Document
 * @desc search for a document in my documents
 * @param {string} document - document details
 * @returns {object} action
 */
export const searchOwnDocuments = (document) => {
  return dispatch => axios.get(`/api/search/myDocuments/?title=${document}`)
    .then((response) => {
      dispatch(searchMyDocuments(response.data.documents));
    })
    .catch((error) => {
      toastr.error(error);
    });
};

/**
 * Get role Documents
 * @desc Gets all role Documents
 * @param {array} documents - response from the server
 * @returns {object} action
 */
export const getRoleDocuments = documents =>
  ({ type: actionTypes.GET_ALL_ROLE_DOCUMENTS, documents });

/**
 * role documents
 * @desc gets all role documents
 * @param {number} limit
 * @param {number} offset
 * @returns {object} action
 */
export const getAllRolesDocuments = (limit, offset) => {
  return dispatch => axios.get(`/api/documents/roles?limit=${limit || 9}&offset=${offset || 0}`)
    .then((response) => {
      dispatch(getRoleDocuments(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Search role Documents
 * @desc search personal Documents
 * @param {array} documents - response from the server
 * @returns {object} action
 */
export const searchRoleDocs = documents =>
  ({ type: actionTypes.SEARCH_ROLE_DOCUMENTS, documents });

/**
 * Search role Document
 * @desc search for a document in role documents
 * @param {string} document - document details
 * @returns {object} action
 */
export const searchRoleDocuments = (document) => {
  return dispatch => axios.get(`/api/search/roleDocuments/?title=${document}`)
    .then((response) => {
      dispatch(searchRoleDocs(response.data.documents));
    })
    .catch((error) => {
      toastr.error(error);
    });
};
