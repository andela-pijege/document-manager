import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';
import * as UserAction from '../actions/UserAction';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.user.id,
      documents: this.props.documents || [],
      roleID: this.props.user.roleID || 0,
      isSearching: false,
    };
    this.createDocument = this.createDocument.bind(this);
    this.openDocument = this.openDocument.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    const userID = this.state.userID;
    this.props.actions.getUserDocuments(userID);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents) {
      this.setState({
        documents: nextProps.documents,
      });
    }
  }

  createDocument() {
    browserHistory.push('/createDocument');
  }

  openDocument(documentID) {
    this.props.actions.getOneDocument(documentID)
      .then(() => {
        browserHistory.push('/openDocument');
      });
  }

  searchDocuments(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 });
    this.props.actions.searchOwnDocuments(searchQuery);
  }

  updateUser() {
    browserHistory.push('/editUser');
  }

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
              browserHistory.push('/');
            }).catch(() => {
              swal('Error!', 'User NOT deleted.', 'error');
            });
        } else {
          swal('Cancelled', 'User not Deleted :)', 'error');
        }
      });
  }

  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedPersonalDocuments : this.state.documents) || [];
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
              {(this.props.user.roleID === 1) ? <div></div>: <a onClick={() => { this.deleteAccount(this.state.userID); }}>delete account</a> }
              <a onClick={() => { this.updateUser(); }}>edit account</a>
            </div>
          </div>
        </div>
        <div className="col s9">
          <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={() => { this.createDocument(); }}>note_add</i></a>
          <div>
            {(this.state.documents.length !== 0) ?
              <div>
                <div className="row">
                  <h4 className="col s6">My documents</h4>
                  <form className="col s6">
                    <div className="input-field">
                      <input type="search" id="search" name="search" placeholder="search for document" onChange={this.searchDocuments} />
                      <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </div>
                <div className="row">
                {
                  (view || []).map(document =>
                    <div key={document.id + 1}>
                      <div className="col s4 m4 doc-wrapper">
                        <div className="card small blue-grey darken-1">
                          <div className="card-content white-text">
                            <span className="card-title">{document.title}</span>
                            <p>{document.content}</p>
                          </div>
                          <div className="card-action">
                            <a onClick={() => { this.openDocument(document.id); }}>view</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
              </div> : <h4>You have no Personal documents!!go ahead and create one!!!</h4>}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: propTypes.shape({
    getAllPublicDocuments: propTypes.func,
    getOneDocument: propTypes.func.isRequired,
    getUserDocuments: propTypes.func.isRequired,
    searchOwnDocuments: propTypes.func.isRequired,
    deleteUserAccount: propTypes.func.isRequired,
  }),
  searchedPersonalDocuments: propTypes.array,
  documents: propTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    publicDocuments: state.DocumentReducer.publicDocuments,
    searchedPersonalDocuments: state.DocumentReducer.searchedPersonalDocuments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
      UserAction,
      DocumentAction), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
