import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const getDocuments = documents =>
  ({ type: actionTypes.GET_USER_DOCUMENT, documents });

export const getUserDocuments = (userID) => {
  console.log('did i even get here');
  return dispatch => axios.get(`/api/users/${userID}/documents`)
    .then((response) => {
      console.log('this is the response from server documents', response.data);
      dispatch(getDocuments(response.data.documents));
    }).catch((error) => console.log(error));
};

export const deleteDocument = response =>
  ({ type: actionTypes.DELETE_USER_DOCUMENT, response });

export const deleteUserDocument = (docID) => {
  console.log('deleting document in progress');
  return dispatch => axios.delete(`/api/documents/${docID}`)
    .then((response) => {
      console.log('this is the response from server', response);
      dispatch(deleteDocument(response));
    }).catch((error) => console.log(error));
};

export const viewDocument = document =>
  ({ type: actionTypes.GET_ONE_DOCUMENT_SUCCESS, document });

export const getOneDocument = (docID) => {
  console.log('viewing document in progress from actions');
  return dispatch => axios.get(`/api/documents/${docID}`)
    .then((response) => {
      console.log('this is document from the server:: one document', response.data);
      dispatch(viewDocument(response.data));
    }).catch((error) => console.log(error));
};

export const createDocument = response =>
  ({ type: actionTypes.CREATE_DOCUMENT_SUCCESS, response });

export const createUserDocument = (documentData) => {
  console.log('creating document:::::-----document data', documentData);
  return dispatch => axios.post('/api/documents', documentData)
    .then((response) => {
      console.log('create document response from the server', response);
      dispatch(createDocument(response.data));
    }).catch((error) => console.log(error));
};

export const updateDocument = response =>
  ({ type: actionTypes.UPDATE_DOCUMENT_SUCCESS, response });

export const updateUserDocument = (documentData) => {
  return dispatch => axios.put(`/api/documents/${documentData.id}`, documentData)
    .then((response) => {
      dispatch(updateDocument(response.data));
    }).catch((error) => console.log(error));
};

export const getPublicDocuments = documents =>
  ({ type: actionTypes.GET_ALL_PUBLIC_DOCUMENTS, documents });

export const getAllPublicDocuments = () => {
  console.log('fetching all documents in the actimons file');
  return dispatch => axios.get('/api/documents/public')
    .then((response) => {
      console.log('getting all public docs from the server response', response.data.documents);
      dispatch(getPublicDocuments(response.data.documents));
    }).catch((error) => console.log(error));
};
