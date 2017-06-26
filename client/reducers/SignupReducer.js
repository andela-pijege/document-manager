import * as actionTypes from '../actions/ActionTypes';

const initialState = { createUser: false, newUser: {} };

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS:
      console.log('this is action in sign up reducer:::::::::', action.user);
      return Object.assign({}, state, {
        newUser: action.user,
      });
    default:
      return state;
  }
};

export default signupReducer;
