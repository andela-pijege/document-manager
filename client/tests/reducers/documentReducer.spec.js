import expect from 'expect';
import documentReducer from '../../reducers/DocumentReducer';
import * as actionTypes from '../../actions/ActionTypes';
import { publicDocuments } from './testData';

describe('document reducer', () => {
  it('should return the initial state', () => {
    expect(documentReducer({}, {})).toEqual({});
  });

  it('should handle GET_ALL_PUBLIC_DOCUMENTS action and save the payload to the store', () => {
    expect(
      documentReducer({},
        {
          type: actionTypes.GET_ALL_PUBLIC_DOCUMENTS,
          documents: publicDocuments
        }
      )
    ).toEqual(
      {
        publicDocuments,
      });
  });
});
