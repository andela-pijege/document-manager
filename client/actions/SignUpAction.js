import axios from 'axios';
import * as actionTypes from './ActionTypes';
import setAuthorizationToken from '../utils/authorization';


export const createUserSuccess = user =>
  ({ type: actionTypes.LOGIN_SUCCESS, user });

export const createUserFailure = () =>
  ({ type: actionTypes.CREATE_USER_FAILURE });


export const createUser = (userInfo) => {
  return dispatch => axios.post('/api/users', userInfo)
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token);
      setAuthorizationToken(response.data.token);
      dispatch(createUserSuccess(response.data));
    }).catch((error) => {
      dispatch(createUserFailure(error));
    });
};
