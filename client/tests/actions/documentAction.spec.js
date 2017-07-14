import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../actions/ActionTypes';
import * as DocumentAction from '../../actions/DocumentAction';
import { document, document2 } from './testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

describe('Document actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('create Documents action', () => {
    it('should display a success message when a new document is created', (done) => {
      moxios.stubRequest('/api/documents', {
        status: 201,
        response: {
          message: 'document created successfully',
        }
      });
      const expectedActions = [{
        type: actionType.CREATE_DOCUMENT_SUCCESS,
        response: { message: 'document created successfully' }
      }];
      const store = mockStore({});
      store.dispatch(DocumentAction.createUserDocument(document))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
          done();
        });
    });
  });

  describe('update Documents action', () => {
    it('should display a success message when a document is updated', (done) => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          message: 'Document updated successfully'
        }
      });
      const expectedActions = [{
        type: actionType.UPDATE_DOCUMENT_SUCCESS,
        response: { message: 'Document updated successfully' }
      }];
      const store = mockStore({});
      store.dispatch(DocumentAction.updateUserDocument(document2))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
          done();
        });
    });
  });

  describe('delete Document action', () => {
    it('should return a success message when document is deleted', (done) => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          message: 'Document successfully deleted'
        }
      });
      const expectedActions = [{
        type: actionType.DELETE_USER_DOCUMENT,
        docID: 1
      }];
      const store = mockStore({});
      store.dispatch(DocumentAction.deleteUserDocument(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
          done();
        });
    });
  });

  // describe('search public Documents action', () => {
  //   it('should return documents after a successful search', (done) => {
  //     moxios.stubRequest('/api/search/documents/?title=doc', {
  //       status: 200,
  //       documents: [],
  //     });
  //     const expectedActions = [
  //       {
  //         type: actionType.SEARCH_PUBLIC_DOCUMENTS,
  //         documents: [],
  //       }
  //     ];
  //     const store = mockStore({});
  //     store.dispatch(DocumentAction.searchPublicDocuments('doc'))
  //     .then(() => {
  //       console.log('from store', store.getActions());
  //       expect(store.getActions()).to.eql(expectedActions);
  //       done();
  //     });
  //   });
  // });
});
