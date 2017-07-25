import * as actionTypes from '../actions/ActionTypes';

const initialState = { createUser: false, newUser: {} };

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS: {
      return { ...state, newUser: action.user };
    }
    default:
      return state;
  }
};

export default signupReducer;
