import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as actionTypes from './ActionTypes';
import setAuthorizationToken from '../utils/authorization';


export const loginSuccess = user =>
  ({ type: actionTypes.LOGIN_SUCCESS, user });

export const loginFailure = () =>
  ({ type: actionTypes.LOGIN_FAILURE });

export const login = (userInfo) => {
  return dispatch => axios.post('/api/users/login', userInfo)
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token);
      setAuthorizationToken(response.data.token);
      dispatch(loginSuccess(response.data));
      browserHistory.push('/dashboard');
      toastr.success('Login Successful');
    }).catch((error) => {
      toastr.error('Incorrect Login details');
      dispatch(loginFailure(error));
    });
};
/**
 * logout - logout Action
 * @return {Function}  dispatch an action
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    // setAuthorizationToken(false);
    dispatch(loginSuccess({}));
  };
}
