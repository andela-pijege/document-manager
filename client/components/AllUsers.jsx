import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as UserAction from '../actions/UserAction';
import Pagination from '../components/Pagination';
import * as DocumentAction from '../actions/DocumentAction';

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: this.props.allUsers || [],
      isSearching: false,
      limit: 10,
      metaData: {},
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.UserAction.getAllusers();
  }

  deleteUser(userID) {
    swal({
      title: 'Are you sure?',
      text: 'This User would be deleted forever!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      closeOnConfirm: false,
      closeOnCancel: false,
    },
      (isConfirm) => {
        if (isConfirm) {
          this.props.UserAction.deleteUserAccount(userID)
            .then(() => {
              swal('Deleted!', 'User deleted successful.', 'success');
              browserHistory.push('allUsers');
            }).catch(() => {
              swal('Error!', 'User NOT deleted.', 'error');
            });
        } else {
          swal('Cancelled', 'User not Deleted :)', 'error');
        }
      });
  }

  searchUser(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.UserAction.searchAllUsers(searchQuery);
  }

  handlePageChange(page) {
    console.log('event', event);
    this.props.UserAction.getAllusers(this.state.limit, (page - 1) * this.state.limit);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allUsers) {
      this.setState({
        allUsers: nextProps.allUsers.users,
        metaData: nextProps.allUsers.metaData,
      });
    }
  }

  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedUsers : this.state.allUsers) || [];
    return (
      <div className="container">
        <h4> All Users</h4>
        <div>
          <form>
            <div className="input-field">
              <input
                type="search"
                id="search"
                name="search"
                placeholder="search for user"
                onChange={this.searchUser}
              />
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
                (<tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  {user.roleID === 1 ? <td></td> :
                  <td><a onClick={() => { this.deleteUser(user.id); }}>
                    <i className="fa fa-trash" aria-hidden="true"></i></a>
                  </td>
                  }
                </tr>),
              )}
            </tbody>
          </table>
          <Pagination
            pageCount={this.state.metaData.pages}
            handleChange={this.handlePageChange}
            currentPage={this.state.metaData.page}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    allUsers: state.UserReducer.allUsers,
    searchedUsers: state.UserReducer.searchedUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
