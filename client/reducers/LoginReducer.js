import isEmpty from 'lodash/isEmpty';
import * as actionTypes from '../actions/ActionTypes';


const initialState = { loginUser: false, user: {} };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        loginUser: !isEmpty(action.user),
        user: action.user,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    case actionTypes.LOGIN_FAILURE:
      return { loginUser: false };
    default:
      return state;
  }
};

export default loginReducer;
