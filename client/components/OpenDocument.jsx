import React, { Component } from 'react';
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
    this.props.DocumentAction.deleteUserDocument(documentID)
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.state.myDocument.title}</span>
                <p>{this.state.myDocument.content}</p>
              </div>
              <div className="card-action">
                <a onClick={() => { this.editDocument(); }}>edit</a>
                <a onClick={() => { this.deleteDocument(this.state.myDocument.id); }}>delete</a>
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
    // user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    document: state.DocumentReducer.document,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenDocument);
