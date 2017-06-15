import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateDocument from './components/CreateDocument';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" components={Login} />
    <Route path="/signUp" components={SignUp} />
    <Route path="/dashboard" components={Dashboard} />
    <Route path="/createDocument" components={CreateDocument} />
  </Route>
);

