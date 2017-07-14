import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import * as UserAction from '../actions/UserAction';

/**
 * @desc represents Edit User Page.
 * @class EditUser
 * @extends {Component}
 */
class EditUser extends Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {object} props
   * @memberof EditUser
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: '',
      roleID: 2,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @desc handles change of events
   * for the form fields
   * @param {any} event
   * @memberof EditUser
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @desc handles the submit action on the form.
   *  Calls the editUser action.
   * @param {object} event
   * @memberof EditUser
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.UserAction.updateUserInfo(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
        toastr.success('profile update Successful');
      })
      .catch(() => {
        toastr.error('profile couldnt update');
      });
  }

  /**
   * @desc renders form to edit user
   * @returns {void} null
   * @memberof EditUser
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s6 offset-s3" onSubmit={this.onSubmit}>
            <h3>Edit Profile</h3>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="firstName"
                  type="text"
                  className="validate"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <label htmlFor="firstName" className="active">First Name</label>
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
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <label htmlFor="lastName" className="active">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="active">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="active">Password</label>
              </div>
            </div>
            <div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
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
 * Set the PropTypes for EditUser
 */
EditUser.propTypes = {
  UserAction: propTypes.shape({
    updateUserInfo: propTypes.func,
  }),
  user: propTypes.shape({
    id: propTypes.number,
    firstName: propTypes.string,
    lastName: propTypes.string,
    email: propTypes.string,
  })
};
/**
 * Sets default values for EditUser Prototype
 */
EditUser.defaultProps = {
  UserAction: {
    updateUserInfo: () => { },
  },
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  },
};
/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 * @memberof EditUser
 */
function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}

/**
 * @desc maps dispatch to DocumentAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} DocumentAction
 * @memberof EditUser
 */
function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
