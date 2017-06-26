import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const updateUser = response =>
  ({ type: actionTypes.UPDATE_USER_SUCCESS, response });

export const updateUserInfo = (userData) => {
  console.log('user info to be updated', userData);
  return dispatch => axios.put()
    .then((response) => {
      console.log('response from the server after updating', response);
      dispatch(updateUser(response));
    }).catch((error) => console.log(error));
};

export const getUsers = users =>
  ({ type: actionTypes.GET_ALL_USER_SUCCESS, users });

export const getAllusers = () => {
  return dispatch => axios.get('/api/users')
    .then((response) => {
      dispatch(getUsers(response.data));
    }).catch((error) => console.log(error));
};

export const searchUsers = users =>
  ({ type: actionTypes.SEARCH_USER, users });

export const searchAllUsers = (user) => {
  console.log('searching for user in action', user);
  return dispatch => axios.get(`/api/search/users/?name=${user}`)
    .then((response) => {
      console.log('response from the server searching users', response.data);
      dispatch(searchUsers(response.data.users));
    }).catch((error) => console.log(error));
};
