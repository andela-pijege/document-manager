import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as DocumentAction from '../actions/DocumentAction';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.user.userID || this.props.newUser.userID,
      documents: this.props.documents || [],
      publicDocuments: this.props.publicDocuments || [],
      roleID: this.props.user.roleID || 0,
    };
    this.createDocument = this.createDocument.bind(this);
    this.openDocument = this.openDocument.bind(this);
  }

  componentWillMount() {
    const userID = this.state.userID;
    this.props.DocumentAction.getAllPublicDocuments();
    this.props.DocumentAction.getUserDocuments(userID);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents) {
      this.setState({
        documents: nextProps.documents,
        publicDocuments: nextProps.publicDocuments,
      });
    }
  }

  createDocument() {
    browserHistory.push('/createDocument');
  }

  openDocument(documentID) {
    this.props.DocumentAction.getOneDocument(documentID)
      .then(() => {
        browserHistory.push('/openDocument');
      });
  }

  render() {
    return (
      <div className="container">
        <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={() => { this.createDocument(); }}>note_add</i></a>
        <div>
          <h4>General public documents</h4>
          <div className="row">
          {
            this.state.publicDocuments.map(document =>
              <div>
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
        </div>
        <div>
          {(this.state.documents.length !== 0) ?
            <div>
              <h4>My documents</h4>
              <div className="row">
              {
                this.state.documents.map(document =>
                  <div>
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
    );
  }
}

Dashboard.propTypes = {
  DocumentAction: propTypes.shape({
    getAllPublicDocuments: propTypes.func,
    getOneDocument: propTypes.func,
    getUserDocuments: propTypes.func,
  }),
};

function mapStateToProps(state) {
  return {
    newUser: state.SignupReducer.newUser,
    user: state.LoginReducer.user,
    documents: state.DocumentReducer.documents,
    publicDocuments: state.DocumentReducer.publicDocuments,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
