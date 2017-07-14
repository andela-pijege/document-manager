import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../actions/ActionTypes';
import * as LoginAction from '../../actions/LoginAction';
import { userInfo, token, user } from './testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

describe('Login actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('login action', () => {
    it('should log a user successfully', (done) => {
      moxios.stubRequest('/api/users/login', {
        status: 200,
        response: { message: 'Login successful', token, user }
      });
      const expectedActions = [{
        type: actionType.LOGIN_SUCCESS,
        user,
      }];
      const store = mockStore({});
      store.dispatch(LoginAction.login(userInfo))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
  });
});