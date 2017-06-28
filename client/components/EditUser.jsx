import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as SignUpAction from '../actions/SignUpAction';

class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleID: 2,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.SignUpAction.createUser(this.state)
      .then(() => { browserHistory.push('/dashboard'); })
      .catch((error) => { message: error });
  }

  render() {
    return (
      <div className="container">
        <form className="col s8" onSubmit={this.onSubmit}>
          <h3>Sign up</h3>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="firstName" type="text" className="validate" name="firstName" value={this.state.firstName} onChange={this.onChange} />
              <label htmlFor="firstName">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="lastName" type="text" className="validate" name="lastName" value={this.state.lastName} onChange={this.onChange} />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" name="email" value={this.state.email} onChange={this.onChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" className="validate" name="password" value={this.state.password} onChange={this.onChange} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Sign up
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newUser: state.SignupReducer.newUser,
  };
}

function mapDispatchToProps(dispatch) {
  return { SignUpAction: bindActionCreators(SignUpAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
