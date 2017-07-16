import expect from 'expect';
import userReducer from '../../reducers/UserReducer';
import * as actionTypes from '../../actions/ActionTypes';
import { user, allUsers } from './testData';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer({}, {})).toEqual({});
  });

  it('should handle GET_ALL_USER_SUCCESS action and save the payload to the store', () => {
    expect(
      userReducer({},
        {
          type: actionTypes.GET_ALL_USER_SUCCESS,
          users: allUsers
        }
      )
    ).toEqual(
      {
        allUsers,
      });
  });


  it('should handle UPDATE_USER_SUCCESS action and update user record', () => {
    expect(
      userReducer({},
        {
          type: actionTypes.UPDATE_USER_SUCCESS,
          user,
        })
      ).toEqual(
      {
        user,
      },
      );
  });
});
