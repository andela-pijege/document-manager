import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal } from 'react-materialize';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';
import * as UserAction from '../actions/UserAction';
import Pagination from '../components/Pagination';
import Search from './Search';

/**
 *
 * @desc represents Dashboard Page.
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
  /**
   * @desc Display all the users documents
   * @param {object} props
   * @memberof Dashboard
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.user.id,
      documents: this.props.documents,
      roleID: this.props.user.roleID || 0,
      isSearching: false,
      limit: 9,
    };
    this.createDocument = this.createDocument.bind(this);
    this.openDocument = this.openDocument.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
 * @desc Invoked after component mounts
 * @param {void} null
 * @return {void} returns nothing
 * @memberof Dashboard
 */
  componentDidMount() {
    const userID = this.state.userID;
    this.props.actions.getUserDocuments(userID);
  }

  /**
   * @desc Invoked immediately after new props is recieved
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   * @memberof Dashboard
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents) {
      this.setState({
        documents: nextProps.documents,
      });
    }
  }

  /**
   * @desc creates documents
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  createDocument() {
    browserHistory.push('/createDocument');
  }

  /**
   * @desc opens documents
   * @param {integer} documentID document id
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  openDocument(documentID) {
    this.props.actions.getOneDocument(documentID)
      .then(() => {
        browserHistory.push('/editDocument');
      });
  }

  /**
   * @desc search for personal documents documents
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  searchDocuments(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.actions.searchOwnDocuments(searchQuery);
  }

  /**
   * @desc deletes a document
   * @param {integer} documentID
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  deleteDocument(documentID) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
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
          this.props.actions.deleteUserDocument(documentID)
            .then(() => {
              swal('Deleted!', 'Document deleted successful.', 'success');
              this.props.actions.getUserDocuments(this.state.userID);
            });
        } else {
          swal('Cancelled', 'Document not Deleted :)', 'error');
        }
      });
  }

  /**
   * @desc updates user profile
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  updateUser() {
    browserHistory.push('/editUser');
  }

    /**
 * @desc handles pagination
 * @param {integer} page
 * @return {void} returns nothing
 * @memberof AllUsers
 */
  handlePageChange(page) {
    this.props.actions.getUserDocuments(this.state.userID, this.state.limit, (page - 1) * this.state.limit);
  }
  /**
   * @desc search for public documents
   * @param {integer} userID
   * @returns {void} returns nothing
   * @memberof Dashboard
   */
  deleteAccount(userID) {
    swal({
      title: 'Are you sure?',
      text: 'Your account would be lost forever!',
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
          this.props.actions.deleteUserAccount(userID)
            .then(() => {
              swal('Deleted!', 'User deleted successfully.', 'success');
            }).catch(() => {
              swal('Error!', 'User NOT deleted.', 'error');
            });
        } else {
          swal('Cancelled', 'User not Deleted :)', 'error');
        }
      });
  }

  /**
   * @desc Displays all users personal documents
   * @returns {array} public documents
   * @memberof Dashboard
   */
  render() {
    const { isSearching } = this.state;
    let documentList;
    let metaData = {};
    if (isSearching) {
      documentList = this.props.searchedPersonalDocuments;
    } else {
      ({ documents: documentList = [], metaData = {} } = this.state.documents);
    }
    return (
      <div className="row">
        <div className="col s3">
          <div className="card">
            <div className="card-image">
              <img src="../images/mugshot.jpg" />
              <span className="card-title">{this.props.user.firstName}</span>
            </div>
            <div className="card-content">
              <p>{this.props.user.email}</p>
            </div>
            <div className="card-action">
              {(this.props.user.roleID === 1) ?
                <div /> :
                <a
                  className="delete-btn"
                  onClick={() => { this.deleteAccount(this.state.userID); }}
                >
                  <i className="fa fa-trash" aria-hidden="true" />delete account</a>}
              <a
                className="update-btn"
                onClick={() => { this.updateUser(); }}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />edit account</a>
            </div>
          </div>
        </div>
        <div className="col s9">
          <a className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons create-btn" onClick={() => { this.createDocument(); }}>note_add</i>
          </a>
          <div>
            {(documentList.length > 0) ?
              <div>
                <div className="row">
                  <h4 className="col s6">My documents</h4>
                  <Search onChange={this.searchDocuments} />
                </div>
                <div className="row">
                  {
                    documentList.map(document =>
                      <div key={document.id + 1}>
                        <div className="col s4 m4 doc-wrapper">
                          <div className="card small blue-grey darken-1">
                            <div className="card-content white-text">
                              <span className="card-title">{document.title}</span>
                              <p dangerouslySetInnerHTML={{ __html: document.content }} />
                            </div>
                            <div className="card-action">
                              <Modal
                                header={document.title}
                                fixedFooter
                                actions={
                                  <section>
                                    <Button waves='light' flat className="modal-action modal-close close-doc">close</Button>
                                    <Button waves='light' onClick={() => { this.openDocument(document.id); }}><i className="fa fa-pencil-square-o" aria-hidden="true" />edit</Button>
                                  </section>
                                }
                                trigger={<a className="view-doc">view</a>}
                              >
                                <p dangerouslySetInnerHTML={{ __html: document.content }} />
                              </Modal>
                              <a className="deleteDoc-btn" onClick={() => { this.deleteDocument(document.id); }}><i className="fa fa-trash" aria-hidden="true" /></a>
                              <a>{document.access}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div> : <h4>You have no documents! Go ahead and create one!!</h4>}
          </div>
          <Pagination
            pageCount={metaData.pages}
            handleChange={this.handlePageChange}
            currentPage={metaData.currentPage}
          />
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Dashboard
 */
Dashboard.propTypes = {
  actions: propTypes.shape({
    getAllPublicDocuments: propTypes.func,
    getOneDocument: propTypes.func,
    getUserDocuments: propTypes.func,
    searchOwnDocuments: propTypes.func,
    deleteUserAccount: propTypes.func,
    deleteUserDocument: propTypes.func
  }),
  user: propTypes.shape({
    firstName: propTypes.string,
    roleID: propTypes.number,
    email: propTypes.string,
    id: propTypes.number,
  }),
  documents: propTypes.shape({
    documents: propTypes.arrayOf(propTypes.object),
    metaData: propTypes.object,
  }),
  searchedPersonalDocuments: propTypes.arrayOf(propTypes.object),
};
/**
 * Sets default values for PublicDocument Proptype
 */
Dashboard.defaultProps = {
  actions: {
    getAllPublicDocuments: () => { },
    getOneDocument: () => { },
    getUserDocuments: () => { },
    searchOwnDocuments: () => { },
    deleteUserAccount: () => { },
    deleteUserDocument: () => { },
  },
  user: {
    firstName: '',
    roleID: 0,
    email: '',
    id: 0,
  },
  searchedPersonalDocuments: [],
  documents: {},
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    searchedPersonalDocuments: state.DocumentReducer.searchedPersonalDocuments,
  };
}

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        UserAction,
        DocumentAction), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
