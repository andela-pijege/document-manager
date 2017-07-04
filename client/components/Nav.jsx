/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';
import * as LoginAction from '../actions/LoginAction';


class Nav extends Component {

  constructor() {
    super();
    this.state = {
    };
    this.handleSigninClick = this.handleSigninClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.logout = this.logout.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllPublicDdocuments = this.getAllPublicDdocuments.bind(this);
    this.dashboard = this.dashboard.bind(this);
    this.getAllRoleDdocuments = this.getAllRoleDdocuments.bind(this);
  }

  handleSigninClick() {
    browserHistory.push('login');
  }

  handleSignupClick() {
    browserHistory.push('signUp');
  }

  getAllUsers() {
    browserHistory.push('/allUsers');
  }

  getAllPublicDdocuments() {
    browserHistory.push('/publicDocuments');
  }

  dashboard() {
    browserHistory.push('/dashboard');
  }

  getAllRoleDdocuments() {
    browserHistory.push('/rolesDocument');
  }

  /**
   * logout - logout a user out
   * @param  {type} event the event handler
   * @return {void} no return or void
   */
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    browserHistory.push('/');
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="blue-grey darken-4">
          <div className="nav-wrapper">
            <a className="brand-logo">Documento</a>
            <ul id="nav-mobile" className="right hide-on-small-only">
              {this.props.isAuthenticated ?
                <div>
                  <li onClick={this.logout}><a>Logout</a></li>
                  <li onClick={() => { this.getAllPublicDdocuments(); }}><a>Public Document</a></li>
                  <li onClick={() => { this.getAllRoleDdocuments(); }}><a>Role Document</a></li>
                  <li onClick={() => { this.dashboard(); }}><a>Dashboard</a></li>
                  {(this.props.user.roleID === 1) ?
                    <div>
                      <li onClick={() => { this.getAllUsers(); }}><a>View All Users</a></li>
                    </div> : <div />}
                </div> :
                <div>
                  <li onClick={() => { this.handleSignupClick(); }}><a>SignUp</a></li>
                  <li onClick={() => { this.handleSigninClick(); }}><a>SignIn</a></li>
                </div>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    isAuthenticated: state.LoginReducer.loginUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(DocumentAction, LoginAction),
      dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
