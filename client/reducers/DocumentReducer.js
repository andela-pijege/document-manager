import * as actionTypes from '../actions/ActionTypes';

const initialState = { documents: {} };

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DOCUMENT: {
      return { ...state, documents: action.documents };
    }
    case actionTypes.GET_ONE_DOCUMENT_SUCCESS: {
      return { ...state, document: action.document };
    }
    case actionTypes.GET_ALL_PUBLIC_DOCUMENTS: {
      return { ...state, publicDocuments: action.documents };
    }
    case actionTypes.SEARCH_MY_DOCUMENTS: {
      return { ...state, searchedPersonalDocuments: action.documents };
    }
    case actionTypes.SEARCH_PUBLIC_DOCUMENTS: {
      return { ...state, searchedPublicDocuments: action.documents };
    }
    case actionTypes.GET_ALL_ROLE_DOCUMENTS: {
      return { ...state, rolesDocument: action.documents };
    }
    case actionTypes.SEARCH_ROLE_DOCUMENTS: {
      return { ...state, searchedRoleDocuments: action.documents };
    }
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return state;
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return state;
    case actionTypes.DELETE_USER_DOCUMENT: {
      const { docID } = action;
      const { documents, metaData } = state.documents;
      const seivedDocList = documents.filter(doc => doc.id !== docID);
      return Object.assign({}, ...state, { documents: { documents: seivedDocList, metaData } });
    }
    case actionTypes.DELETE_USER_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default documentReducer;
