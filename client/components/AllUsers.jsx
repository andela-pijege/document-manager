import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserAction from '../actions/UserAction';
import * as DocumentAction from '../actions/DocumentAction';

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: this.props.allUsers || [],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    this.props.UserAction.getAllusers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allUsers) {
      this.setState({
        allUsers: nextProps.allUsers,
      });
    }
  }

  deleteUser(userID) {
    console.log('i want to delete this user', userID);
  }

  render() {
    console.log('all users render component', this.state.allUsers);
    return (
      <div>
        <h4>this is all users</h4>
        <div>
          <table className="striped centered">
            <thead>
              <tr>
                <th><i className="material-icons prefix">account_circle</i>First Name</th>
                <th><i className="material-icons prefix">account_circle</i>Last Name</th>
                <th><i className="material-icons prefix">email</i>Email</th>
                <th>delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.allUsers.map(user =>
              <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><a onClick={() => { this.deleteUser(user.id); }}><i className="close material-icons">close</i></a></td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.UserReducer.allUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
