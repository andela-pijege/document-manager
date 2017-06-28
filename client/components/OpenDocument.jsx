import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';

class OpenDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDocument: this.props.document || [],
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }

  editDocument() {
    browserHistory.push('/editDocument');
  }

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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.state.myDocument.title}</span>
                <p>{this.state.myDocument.content}</p>
              </div>
              <div className="card-action">
                {(this.props.user.userID === this.state.myDocument.userID) ?
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

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    document: state.DocumentReducer.document,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenDocument);
