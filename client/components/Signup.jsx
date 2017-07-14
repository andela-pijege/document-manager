import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as SignUpAction from '../actions/SignUpAction';

/**
 * @desc represents Signup Page.
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * Creates an instance of Signup.
   * @param {object} props
   * @memberof Signup
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleID: 2,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @desc handles change of events
   * for the form fields
   * @param {any} event
   * @memberof Signup
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @desc handles the submit action on the form.
   *  Calls the Login action.
   * @param {object} event
   * @memberof Signup
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.firstName.length < 2 || this.state.lastName.length < 2) {
      toastr.error('First Name and Last Name must be more than 2 characters');
    } else if (this.state.password.length < 8) {
      toastr.error('Password must be 8 characters or more');
    } else if (this.state.password !== this.state.confirmPassword) {
      toastr.error('Password doesnt match');
    } else {
      const form = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        roleID: this.state.roleID,
      };
      this.props.SignUpAction.createUser(form);
    }
  }

  /**
   * @desc renders form to Signup
   * @returns {void} null
   * @memberof Signup
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
            <h3 className="center">Sign up</h3>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="firstName"
                  type="text"
                  className="validate"
                  name="firstName"
                  required="required"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="lastName"
                  type="text"
                  className="validate"
                  name="lastName"
                  required="required"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
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
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  id="confirmPassword"
                  type="password"
                  className="validate"
                  required="required"
                  name="confirmPassword"
                  value={this.state.changePassword}
                  onChange={this.onChange}
                />
                <label htmlFor="password">confirm Password</label>
              </div>
            </div>
            <div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Sign up
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Signup
 */
Signup.propTypes = {
  SignUpAction: propTypes.shape({
    createUser: propTypes.func,
  }),
};

/**
 * Sets default values for Signup Prototype
 */
Signup.defaultProps = {
  SignUpAction: {
    createUser: () => {},
  },
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 * @memberof Signup
 */
function mapStateToProps(state) {
  return {
    newUser: state.SignupReducer.newUser,
  };
}

/**
 * @desc maps dispatch to SignUpAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} SignUpAction
 * @memberof Signup
 */
function mapDispatchToProps(dispatch) {
  return { SignUpAction: bindActionCreators(SignUpAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
