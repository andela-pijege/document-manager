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
      roleID: this.props.user.roleID || 0,
      isSearching: false,
    };
    this.createDocument = this.createDocument.bind(this);
    this.openDocument = this.openDocument.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
  }

  componentWillMount() {
    const userID = this.state.userID;
    this.props.DocumentAction.getUserDocuments(userID);
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
    this.props.DocumentAction.getOneDocument(documentID)
      .then(() => {
        browserHistory.push('/openDocument');
      });
  }

  searchDocuments(event) {
    const searchQuery = event.target.value;
    this.setState({ isSearching: searchQuery.length > 0 })
    this.props.DocumentAction.searchOwnDocuments(searchQuery);
  }

  render() {
    const { isSearching } = this.state;
    const view = (isSearching ? this.props.searchedPersonalDocuments : this.state.documents) || []
    return (
      <div className="container">
        <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={() => { this.createDocument(); }}>note_add</i></a>
        <div>
          {(this.state.documents.length !== 0) ?
            <div>
              <h4>My documents</h4>
              <form>
                <div className="input-field">
                  <input type="search" id="search" name="search" placeholder="search for document" onChange={this.searchDocuments} />
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
              <div className="row">
              {
                (view || []).map(document =>
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
    searchedPersonalDocuments: state.DocumentReducer.searchedPersonalDocuments,
  };
}

function mapDispatchToProps(dispatch) {
  return { DocumentAction: bindActionCreators(DocumentAction, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
