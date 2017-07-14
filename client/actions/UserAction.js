import axios from 'axios';
import toastr from 'toastr';
import * as actionTypes from './ActionTypes';

/**
 * Update User Profile
 * @desc Update the users profile
 * @param {object} user - updated user
 * @returns {object} action
 */
export const updateUser = user =>
  ({ type: actionTypes.UPDATE_USER_SUCCESS, user });

/**
 * Update Profile
 * @desc Update an existing profile
 * @param {object} userData - updated profile details
 * @param {object} currentProfile - current profile details
 * @returns {object} action
 */
export const updateUserInfo = (userData) => {
  return dispatch => axios.put(`/api/users/${userData.id}`, userData)
    .then((response) => {
      dispatch(updateUser(response.data.user));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Get Users
 * @desc gets all users
 * @param {array} users - all users
 * @returns {object} action
 */
export const getUsers = users =>
  ({ type: actionTypes.GET_ALL_USER_SUCCESS, users });

/**
 * Get Users
 * @param {number} limit
 * @param {number} offset
 * @desc gets all users
 * @returns {object} action
 */
export const getAllusers = (limit, offset) => {
  return dispatch => axios.get(`/api/users?limit=${limit || 10}&offset=${offset || 0}`)
    .then((response) => {
      dispatch(getUsers(response.data));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Search for Users
 * @param {array} users - all returned role users
 * @desc search for a user
 * @returns {object} action
 */
export const searchUsers = users =>
  ({ type: actionTypes.SEARCH_USER, users });

/**
 * search fro a User
 * @desc Deletes an existing document
 * @param {string} user - user name
 * @returns {object} action
 */
export const searchAllUsers = (user) => {
  return dispatch => axios.get(`/api/search/users/?name=${user}`)
    .then((response) => {
      dispatch(searchUsers(response.data.users));
    }).catch((error) => {
      toastr.error(error);
    });
};

/**
 * Delete Existing User
 * @desc Delete a Single User
 * @param {object} response - response from the server
 * @returns {object} action
 */
export const deleteUser = response =>
  ({ type: actionTypes.DELETE_USER, response });

/**
 * Delete User
 * @desc Deletes an existing document
 * @param {number} userID - user id
 * @returns {object} action
 */
export const deleteUserAccount = (userID) => {
  return dispatch => axios.delete(`/api/users/${userID}`)
    .then((response) => {
      dispatch(deleteUser(response));
    }).catch((error) => {
      toastr.error(error);
    });
};
