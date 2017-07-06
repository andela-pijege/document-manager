import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout } from '../actions/LoginAction';


export const Nav = ({ logout, user, isAuthenticated }) => (
  <div className="navbar-fixed">
    <nav className="blue-grey darken-4">
      <div className="nav-wrapper">
        <a className="brand-logo left">Documento</a>
        <ul id="nav-mobile" className="right hide-on-small-only">
          {isAuthenticated ?
            <div>
              <li onClick={() => {
                logout();
                browserHistory.push('/');
              }}
              ><a>Logout <i className="fa fa-sign-out" aria-hidden="true"></i></a></li>
              <li onClick={() => browserHistory.push('/publicDocuments')}><a>Public Document</a></li>
              <li onClick={() => browserHistory.push('/rolesDocument')}><a>Role Document</a></li>
              <li onClick={() => browserHistory.push('/dashboard')}><a>Dashboard</a></li>
              {(user.roleID === 1) ?
                <div>
                  <li onClick={() => browserHistory.push('/allUsers')}><a>View All Users</a></li>
                </div> : <div />}
            </div> :
            <div>
              <li onClick={() => browserHistory.push('signUp')}><a>SignUp <i className="fa fa-user-plus" aria-hidden="true"></i></a></li>
              <li onClick={() => browserHistory.push('login')}><a>SignIn <i className="fa fa-sign-in" aria-hidden="true"></i></a></li>
            </div>
          }
        </ul>
      </div>
    </nav>
  </div>
);

export function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    isAuthenticated: state.LoginReducer.loginUser,
  };
}

export default connect(mapStateToProps, { logout })(Nav);
