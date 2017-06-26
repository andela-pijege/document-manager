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
      isSearching: false,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
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

  searchUser(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.UserAction.searchAllUsers(searchQuery);
  }

  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedUsers : this.state.allUsers) || [];
    console.log('this is view', view);
    return (
      <div className="container">
        <h4>this is all users</h4>
        <div>
          <form>
            <div className="input-field">
              <input type="search" id="search" name="search" placeholder="search for user" onChange={this.searchUser} />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
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
              {(view || []).map(user =>
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
  console.log('map state to props method', state.UserReducer.searchedUsers);
  return {
    allUsers: state.UserReducer.allUsers,
    searchedUsers: state.UserReducer.searchedUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
