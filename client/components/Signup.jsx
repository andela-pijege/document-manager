import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as SignUpAction from '../actions/SignUpAction';

class Signup extends Component {

  constructor() {
    super();
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
      .then(() => { browserHistory.push('dashboard'); })
      .catch((error) => { message: error });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Sign up</h3>
          <div className="row">
            <div className="input-field col s6">
              <input id="firstName" type="text" className="validate" name="firstName" value={this.state.firstName} onChange={this.onChange} />
              <label htmlFor="firstName">First Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="lastName" type="text" className="validate" name="lastName" value={this.state.lastName} onChange={this.onChange} />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="email" type="email" className="validate" name="email" value={this.state.email} onChange={this.onChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="password" type="password" className="validate" name="password" value={this.state.password} onChange={this.onChange} />
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

// SignUp.propTypes = {
//   SignUpAction: React.PropTypes.func.isRequired,
// };

function mapStateToProps(state, ownProps) {
  console.log('map state to props function here is state variable', state);
  console.log('map state to props function here is own props variable', ownProps);
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { SignUpAction: bindActionCreators(SignUpAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
