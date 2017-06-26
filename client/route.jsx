import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateDocument from './components/CreateDocument';
import OpenDocument from './components/OpenDocument';
import EditDocument from './components/EditDocument';
import AllUsers from './components/AllUsers';
import PublicDocument from './components/PublicDocument';
import Authenticate from './utils/Authenticate';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" components={Login} />
    <Route path="/signUp" components={SignUp} />
    <Route path="/dashboard" components={Authenticate(Dashboard)} />
    <Route path="/createDocument" components={Authenticate(CreateDocument)} />
    <Route path="/openDocument" components={Authenticate(OpenDocument)} />
    <Route path="/editDocument" components={Authenticate(EditDocument)} />
    <Route path="/allUsers" components={Authenticate(AllUsers)} />
    <Route path="/publicDocuments" components={Authenticate(PublicDocument)} />
  </Route>
);

