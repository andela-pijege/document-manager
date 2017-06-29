import axios from 'axios';
import { browserHistory } from 'react-router';
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
      dispatch(createUserSuccess(response.data.user));
      browserHistory.push('/dashboard');
    }).catch((error) => {
      dispatch(createUserFailure(error));
    });
};
