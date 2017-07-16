import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../actions/ActionTypes';
import * as UserActions from '../../actions/UserAction';
import { users, metaData, user } from './testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

describe('User actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('get user actions', () => {
    it('should return all users', (done) => {
      moxios.stubRequest('/api/users?limit=10&offset=0', {
        status: 200,
        response: {
          users,
          metaData
        }
      });
      const expectedActions = [
        {
          type: actionType.GET_ALL_USER_SUCCESS,
          users: { users, metaData }
        }
      ];
      const store = mockStore({});
      store.dispatch(UserActions.getAllusers(0))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
          done();
        });
    });
  });
  describe('update user Profile action', () => {
    it('it should update successfully update a user', (done) => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          user,
          message: 'user updated successfully'
        }
      });
      const expectedActions = [
        {
          type: actionType.UPDATE_USER_SUCCESS,
          user,
        }
      ];
      const store = mockStore({});
      store.dispatch(UserActions.updateUserInfo(user, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
          done();
        });
    });
  });
  describe('search all users action', () => {
    it('should return user(s) when user(s) are retrieved', () => {
      moxios.stubRequest('/api/search/users/?name=eyo', {
        status: 200,
        response: { user }
      });
      const expectedActions = [
        {
          type: actionType.SEARCH_USER,
          user,
        }
      ];
      const store = mockStore({});
      store.dispatch(UserActions.searchAllUsers('eyo'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});
