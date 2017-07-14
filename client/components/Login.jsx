import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../actions/LoginAction';

/**
 * @desc represents Login Page.
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {object} props
   * @memberof Login
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @desc handles change of events
   * for the form fields
   * @param {any} event
   * @memberof Login
   * @returns {void}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @desc handles the submit action on the form.
   *  Calls the Login action.
   * @param {object} event
   * @memberof Login
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.LoginAction.login(this.state);
  }

  /**
   * @desc renders form to login
   * @returns {void} null
   * @memberof Login
   */
  render() {
    return (
      <div className="row">
        <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
          <h3 className="center">Sign in</h3>
          <div className="row">
            <div className="input-field">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                type="email"
                className="validate"
                required="required"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <i className="material-icons prefix">lock</i>
              <input
                id="password"
                type="password"
                className="validate"
                required="required"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div>
            <button
              className="btn waves-effect waves-light login-btn"
              type="submit"
              name="action"
            >Sign in
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Login
 */
Login.propTypes = {
  LoginAction: PropTypes.shape({
    login: PropTypes.func.isRequired }),
};

/**
 * Sets default values for Login Prototype
 */
Login.defaultProps = {
  LoginAction: {
    login: () => {},
  },
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 * @memberof Login
 */
function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}

/**
 * @desc maps dispatch to LoginAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} LoginAction
 * @memberof Login
 */
function mapDispatchToProps(dispatch) {
  return { LoginAction: bindActionCreators(LoginAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
