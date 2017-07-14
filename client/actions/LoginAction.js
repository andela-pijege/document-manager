import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as actionTypes from './ActionTypes';
import setAuthorizationToken from '../utils/authorization';

/**
 * @desc logs in a user
 * @param {object} user user details
 * @returns {object} actiontype, and payload
 */
export const loginSuccess = user =>
  ({ type: actionTypes.LOGIN_SUCCESS, user });

export const loginFailure = () =>
  ({ type: actionTypes.LOGIN_FAILURE });

/**
 *
 * @desc logs in a user then saves the
 *  token in the local storage
 * @param {object} userInfo object containing user info
 */

export const login = (userInfo) => {
  return dispatch => axios.post('/api/users/login', userInfo)
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token);
      setAuthorizationToken(response.data.token);
      dispatch(loginSuccess(response.data.user));
      if (localStorage.getItem('jwtToken')) {
        browserHistory.push('/dashboard');
        toastr.success('Login Successful');
      }
    }).catch((error) => {
      toastr.error('Incorrect Login details');
      dispatch(loginFailure(error));
    });
};

/**
 * logout - logout Action
 * @return {object}  dispatch an action
 */

export const logout = () => {
  return dispatch => axios.get('/api/users/logout')
    .then((response) => {
      localStorage.removeItem('jwtToken');
      dispatch(loginSuccess({}));
      toastr.success(response.data.message);
    });
};
