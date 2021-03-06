import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './styles/index.scss';
import './styles/toastr.scss';
import routes from './route';
import setAuthorizationToken from './utils/authorization';
import { loginSuccess } from './actions/LoginAction';
import configureStore from './store/configureStore';
import '../node_modules/sweetalert/dist/sweetalert.css';

const store = configureStore();
const token = localStorage.jwtToken;

if (token) {
  setAuthorizationToken(token);
  const details = jwtDecode(token);
  store.dispatch(loginSuccess(details.filteredData));
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
