import * as actionTypes from '../actions/ActionTypes';

const initialState = { documents: [] };

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DOCUMENT:
      return Object.assign({}, state, {
        documents: action.documents,
      });
    case actionTypes.GET_ONE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        document: action.document,
      });
    case actionTypes.GET_ALL_PUBLIC_DOCUMENTS:
      return Object.assign({}, state, {
        publicDocuments: action.documents,
      });
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return state;
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return state;
    case actionTypes.DELETE_USER_DOCUMENT:
      return state;
    default:
      return state;
  }
};

export default documentReducer;
