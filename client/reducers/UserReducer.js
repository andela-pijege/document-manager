import * as actionTypes from '../actions/ActionTypes';

const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER_SUCCESS:
      return Object.assign({}, state, {
        allUsers: action.users,
      });
    case actionTypes.SEARCH_USER:
      return Object.assign({}, state, {
        searchedUsers: action.users,
      });
    case actionTypes.DELETE_USER:
      return state;
    case actionTypes.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
};

export default userReducer;
