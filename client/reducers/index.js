import { combineReducers } from 'redux';
import SignupReducer from './SignupReducer';
import LoginReducer from './LoginReducer';
import DocumentReducer from './DocumentReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  SignupReducer,
  LoginReducer,
  DocumentReducer,
  UserReducer,
});

export default rootReducer;
