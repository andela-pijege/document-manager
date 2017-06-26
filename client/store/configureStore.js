/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(
       applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f),
    );

export default configureStore;
