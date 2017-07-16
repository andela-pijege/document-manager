import chai from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../actions/ActionTypes';
import * as SignUpAction from '../../actions/SignUpAction';
import { token, user, userData } from './testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

describe('SignUp actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('SignUp action', () => {
    it('should signup successfully', (done) => {
      moxios.stubRequest('/api/users', {
        status: 201,
        response: { token, user }
      });
      const expectedActions = [{
        type: actionType.LOGIN_SUCCESS,
        user,
      }];
      const store = mockStore({});
      store.dispatch(SignUpAction.createUser(userData))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
  });
});

