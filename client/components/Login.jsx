import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginAction from '../actions/LoginAction';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.LoginAction.login(this.state);
  }


  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Sign in</h3>
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
              <input id="password" type="password" className="validate"name="password" value={this.state.password} onChange={this.onChange} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  LoginAction: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { LoginAction: bindActionCreators(LoginAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
