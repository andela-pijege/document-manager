import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';

/**
 *
 * @desc represents OpenDocument Page.
 * @class OpenDocument
 * @extends {Component}
 */
class OpenDocument extends Component {
  /**
   * @desc Display all the users documents
   * @param {object} props
   * @memberof OpenDocument
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      myDocument: this.props.document || [],
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }

  /**
   * @desc calls the edit document action
   * @param {integer} documentID
   * @returns {void} returns nothing
   * @memberof OpenDocument
   */
  editDocument() {
    browserHistory.push('/editDocument');
  }
  /**
   * @desc deletes a document
   * @param {integer} documentID
   * @returns {void} returns nothing
   * @memberof OpenDocument
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
          this.props.DocumentAction.deleteUserDocument(documentID)
            .then(() => {
              browserHistory.push('/dashboard');
              swal('Deleted!', 'Document deleted successful.', 'success');
            });
        } else {
          swal('Cancelled', 'Document not Deleted :)', 'error');
        }
      });
  }

  /**
   * @desc Displays a document
   * @returns {object} a document
   * @memberof OpenDocument
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card blue-grey darken-1 large">
              <div className="card-content white-text">
                <span className="card-title">{this.state.myDocument.title}</span>
                <p dangerouslySetInnerHTML={{ __html: this.state.myDocument.content }} />
              </div>
              <div className="card-action">
                {(this.props.user.id === this.state.myDocument.userID) ?
                  <div>
                    <a onClick={() => { this.editDocument(); }}>edit</a>
                    <a onClick={() => { this.deleteDocument(this.state.myDocument.id); }}>delete</a>
                  </div>
                  : <div />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for OpenDocument
 */
OpenDocument.propTypes = {
  DocumentAction: propTypes.shape({
    deleteUserDocument: propTypes.func,
  }),
  user: propTypes.shape({
    id: propTypes.number,
  }),
  document: propTypes.arrayOf(propTypes.object),
};
/**
 * Sets default values for OpenDocument Proptype
 */
OpenDocument.defaultProps = {
  DocumentAction: {
    deleteUserDocument: () => {},
  },
  user: {
    id: 0,
  },
  document: [],
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
    document: state.DocumentReducer.document,
  };
}

/**
 * @desc maps dispatch to DocumentAction
 * @param {object} dispatch - the action to dispatch
 * @return {object} DocumentAction
 */
function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenDocument);
