/* eslint-disable */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateDocument from './components/CreateDocument';
import EditDocument from './components/EditDocument';
import AllUsers from './components/AllUsers';
import EditUser from './components/EditUser';
import Documents from './components/Documents';
import Authenticate from './utils/Authenticate';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" components={Login} />
    <Route path="/signUp" components={SignUp} />
    <Route path="/dashboard" components={Authenticate(Dashboard)} />
    <Route path="/createDocument" components={Authenticate(CreateDocument)} />
    <Route path="/editDocument" components={Authenticate(EditDocument)} />
    <Route path="/allUsers" components={Authenticate(AllUsers)} />
    <Route path="/editUser" components={Authenticate(EditUser)} />
    <Route path="/publicDocuments" components={Authenticate(Documents)} />
    <Route path="/rolesDocument" components={Authenticate(Documents)} />
  </Route>
);

