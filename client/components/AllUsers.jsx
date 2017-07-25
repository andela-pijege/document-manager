import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as UserAction from '../actions/UserAction';
import Pagination from '../components/Pagination';

/**
 *
 * @desc represents All Users Page.
 * @class AllUsers
 * @extends {Component}
 */
export class AllUsers extends Component {
  /**
   * Creates an instance of AllUsers.
   * @param {object} props
   * @memberof AllUsers
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      allUsers: this.props.allUsers.users || [],
      isSearching: false,
      limit: 10,
      metaData: {},
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @desc Invoked after component mounts
   * @param {void} null
   * @return {void} returns nothing
   * @memberof AllUsers
   */
  componentDidMount() {
    this.props.UserAction.getAllusers();
  }

  /**
   * @desc Invoked immediately after new props is recieved
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   * @memberof getAllusers
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.allUsers) {
      this.setState({
        allUsers: nextProps.allUsers.users,
        metaData: nextProps.allUsers.metaData,
      });
    }
  }

  /**
   * @desc handles pagination
   * @param {integer} page
   * @return {void} returns nothing
   * @memberof AllUsers
   */
  handlePageChange(page) {
    this.props.UserAction.getAllusers(this.state.limit, (page - 1) * this.state.limit);
  }

  /**
   * @desc search for user documents
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof AllUsers
   */
  searchUser(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.UserAction.searchAllUsers(searchQuery);
  }

  /**
   * @desc Deletes a user
   * @param {integer} userID document id
   * @return {void} returns nothing
   * @memberof AllUsers
   */
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
              this.props.UserAction.getAllusers();
            }).catch(() => {
              swal('Error!', 'User NOT deleted.', 'error');
            });
        } else {
          swal('Cancelled', 'User not Deleted :)', 'error');
        }
      });
  }

  /**
   * @desc Displays all Users
   * @returns {array} list of Users
   * @memberof PublicDocument
   */
  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedUsers : this.state.allUsers) || [];
    return (
      <div className="container">
        <h4 className="title">All Users</h4>
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
              <label
                className="label-icon"
                htmlFor="search"
              ><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
          <table className="striped centered">
            <thead>
              <tr>
                <th><i className="material-icons prefix">account_circle</i>First Name</th>
                <th><i className="material-icons prefix">account_circle</i>Last Name</th>
                <th><i className="material-icons prefix">email</i>Email</th>
                <th><i className="fa fa-trash" aria-hidden="true" />delete</th>
              </tr>
            </thead>

            <tbody>
              {(view || []).map(user =>
                (<tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  {user.roleID === 1 ? <td /> :
                  <td><a onClick={() => { this.deleteUser(user.id); }}>
                    <i className="fa fa-trash" aria-hidden="true" /></a>
                  </td>
                  }
                </tr>),
              )}
            </tbody>
          </table>
          {isSearching ? <div /> :
          <Pagination
            pageCount={this.state.metaData.pages}
            handleChange={this.handlePageChange}
            currentPage={this.state.metaData.currentPage}
          />
          }
        </div>
      </div>
    );
  }
}

AllUsers.propTypes = {
  UserAction: propTypes.shape({
    getAllusers: propTypes.func,
    deleteUserAccount: propTypes.func,
    searchAllUsers: propTypes.func,
  }),
  allUsers: propTypes.shape({
    users: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  getAllusers: propTypes.arrayOf(propTypes.object),
  searchAllUsers: propTypes.arrayOf(propTypes.object),
  searchedUsers: propTypes.arrayOf(propTypes.object),
};

/**
 * Sets default values for PublicDocument Prototype
 */
AllUsers.defaultProps = {
  UserAction: {
    getAllusers: () => {},
    deleteUserAccount: () => {},
    searchAllUsers: () => {},
  },
  allUsers: {
    users: [],
    metaData: {},
  },
  getAllusers: [],
  searchAllUsers: [],
  searchedUsers: [],
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    allUsers: state.UserReducer.allUsers || {},
    searchedUsers: state.UserReducer.searchedUsers,
  };
}

/**
 * @desc maps dispatch to UserAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} UserAction
 */
function mapDispatchToProps(dispatch) {
  return { UserAction: bindActionCreators(UserAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
