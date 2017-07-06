import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import * as UserAction from '../actions/UserAction';

class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this .props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
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
    this.props.UserAction.updateUserInfo(this.state)
      .then(() => {
        browserHistory.push('/dashboard');
        toastr.success('profile update Successful');
      })
      .catch((error) => { message: error });
  }

  render() {
    return (
      <div className="container">
        <form className="col s8" onSubmit={this.onSubmit}>
          <h3>Edit Profile</h3>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="firstName" type="text" className="validate" name="firstName" value={this.state.firstName} onChange={this.onChange} />
              <label htmlFor="firstName" className="active">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="lastName" type="text" className="validate" name="lastName" value={this.state.lastName} onChange={this.onChange} />
              <label htmlFor="lastName" className="active">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" name="email" value={this.state.email} onChange={this.onChange} />
              <label htmlFor="email" className="active">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock</i>
              <input id="password" type="password" className="validate" name="password" value={this.state.password} onChange={this.onChange} />
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
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.LoginReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
